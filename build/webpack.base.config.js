const path = require('path')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)

const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-eval-source-map',
    performance: {
        hints: isProd ? 'warning' : false,
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 500 * 1024,
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    warnings: false, compress: true,
                    output: {comments: false},
                    cache: true,
                    parallel: true
                }
            })
        ],
    },
    output: {
        path: resolve('../public'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.vue'],
        alias: {
            '@': resolve('../src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {hotReload: true}
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1, minimize: {discardComments: {removeAll: true}}}
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {minimize: {discardComments: {removeAll: true}}}
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {minimize: {discardComments: {removeAll: true}}}
                    },
                    'postcss-loader',
                    'stylus-loader',
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {limit: 10000, name: 'fonts/[name].[hash:7].[ext]'}
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {limit: 10000, name: 'img/[name].[hash:7].[ext]'}
            }
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        }),
        new VueLoaderPlugin()
    ]
}

if (isProd) {
    config.plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }))
}

module.exports = config