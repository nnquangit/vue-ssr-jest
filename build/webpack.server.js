const webpack = require('webpack');
const merge = require('webpack-merge')
const path = require('path');
const base = require('./webpack.base')

const {SSRServerPlugin} = require('ssr-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)
const nodeExternals = require('webpack-node-externals')

const config = merge(base({removeCss: true}), {
    target: 'node',
    entry: resolve('../src/entry-server.js'),
    output: {
        path: resolve('../public'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    optimization: {
        splitChunks: false,
        runtimeChunk: false
    },
    externals: nodeExternals({whitelist: /\.css$/}),
    module: {
        rules: [
            {test: /\.(css|less|scss|sass|styl)$/, use: 'ignore-loader'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.REACT_ENV': '"server"'
        }),
        new SSRServerPlugin()
    ]
})

module.exports = config