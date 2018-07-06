require('babel-register')
process.traceDeprecation = true

const MFS = require('memory-fs')
const path = require('path')
const webpack = require('webpack')

const resolve = (file) => path.resolve(__dirname, file)
const readFile = (output, file) => output.readFileSync(file, 'utf-8')

module.exports = function setupDevServer(app, done) {
    let manifest, serverBundle;
    const clientConfig = require('./webpack.client.js');
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    let clientResolver, clientPromise = new Promise((resolve, reject) => clientResolver = resolve)
    const clientCompiler = webpack(clientConfig);
    clientCompiler.outputFileSystem = new MFS()
    app.use(require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: false,
        watchOptions: {aggregateTimeout: 300, poll: 1000},
        logLevel: 'silent'
    }));
    clientCompiler.hooks.done.tap("Client compiled", function (compilation, callback) {
        let {path: outputPath} = compilation.compilation.options.output;
        let context = readFile(clientCompiler.outputFileSystem, path.join(outputPath, 'ssr-client-manifest.json'));
        manifest = JSON.parse(context);
        if (serverBundle) {
            done({manifest, serverBundle})
        }
        clientResolver();
        console.log(">>>>>>>>>>> Client compiled done")
        return callback;
    });
    app.use(require('webpack-hot-middleware')(clientCompiler))

    const reactConfig = require('./webpack.server.js');
    let reactResolver, reactPromise = new Promise((resolve, reject) => reactResolver = resolve)
    const reactCompiler = webpack(reactConfig);
    reactCompiler.outputFileSystem = new MFS()
    reactCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))

        let {filename, path: outputPath} = reactConfig.output;
        let context = readFile(reactCompiler.outputFileSystem, path.join(outputPath, filename));
        serverBundle = eval(context);
        if (manifest) {
            done({manifest, serverBundle})
        }
        console.log(">>>>>>>>>>> Server compiled done")
        reactResolver();
    })

    return Promise.all([clientPromise, reactPromise])
}