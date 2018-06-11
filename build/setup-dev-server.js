const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

process.traceDeprecation = true

module.exports = function setupDevServer(app, cb) {
    let bundle, clientManifest
    let resolve
    const readyPromise = new Promise(r => {
        resolve = r
    })
    const ready = (...args) => {
        cb(...args)
        resolve()
    }
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
    const client = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(client, {
        publicPath: clientConfig.output.publicPath,
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
    client.plugin('done', () => {
        clientManifest = JSON.parse(readFile(client.outputFileSystem, 'vue-ssr-client-manifest.json'))
        if (bundle) {
            ready(bundle, {clientManifest})
        }
    })
    app.use(require('webpack-hot-middleware')(client))

    //serverCompiler
    const server = webpack(serverConfig)
    server.outputFileSystem = new MFS()
    server.watch({}, (err, stats) => {
        bundle = JSON.parse(readFile(server.outputFileSystem, 'vue-ssr-server-bundle.json'))
        if (clientManifest) {
            ready(bundle, {clientManifest})
        }
    })

    return readyPromise
}
