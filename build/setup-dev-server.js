const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

process.traceDeprecation = true

module.exports = function setupDevServer(app, cb) {
    let bundle, clientManifest
    const readFile = (output, file) => output.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')

    // Config client for webpack-hot-middleware
    // https://github.com/webpack-contrib/webpack-hot-middleware
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    //clientCompiler
    let clientResolver
    const clientPromise = new Promise((resolve, reject) => clientResolver = resolve)
    const client = webpack(clientConfig)
    client.hooks.done.tap("Webpack client", function (compilation, callback) {
        clientManifest = JSON.parse(readFile(client.outputFileSystem, 'vue-ssr-client-manifest.json'))
        if (bundle) {
            cb(bundle, {clientManifest})
        }
        clientResolver()
    })

    //serverCompiler
    let serverResolver
    const serverPromise = new Promise((resolve, reject) => serverResolver = resolve)
    const server = webpack(serverConfig)
    server.outputFileSystem = new MFS()
    server.hooks.done.tap("Webpack server", function (compilation, callback) {
        bundle = JSON.parse(readFile(server.outputFileSystem, 'vue-ssr-server-bundle.json'))
        if (clientManifest) {
            cb(bundle, {clientManifest})
        }
        serverResolver()
    });
    server.watch({}, (err, stats) => console.log("Webpack server watching..."))

    //devMiddleware
    const devMiddleware = require('webpack-dev-middleware')(client, {
        publicPath: clientConfig.output.publicPath,
        // stats: false,
        stats: {
            colors: true,
            modules: false,
            children: false,
            entrypoints: false,
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    })
    app.use(devMiddleware)
    app.use(require('webpack-hot-middleware')(client))

    return Promise.all([clientPromise, serverPromise])
}
