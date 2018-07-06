const webpack = require('webpack')
const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const {SSRClientPlugin} = require('ssr-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (file) => path.resolve(__dirname, file)
const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: [
            require('autoprefixer')({
                browsers: [
                    'ie >= 10', 'ie_mob >= 10', 'ff >= 30',
                    'chrome >= 21', 'safari >= 6', 'opera >= 23',
                    'ios >= 7', 'android >= 4.4', 'bb >= 10', 'firefox 47'
                ]
            }),
        ]
    }
}

const config = (opt = {}) => ({
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-eval-source-map',
    performance: {
        hints: isProd ? 'warning' : false,
        maxEntrypointSize: 1024 * 1024,
        maxAssetSize: 500 * 1024,
    },
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 1000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                    priority: -10
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        },
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
        runtimeChunk: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.vue'],
        alias: {
            '@': resolve('./src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {hotReload: true}
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'cache-loader',
                    'babel-loader?cacheDirectory'
                ]
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'cache-loader',
                    'css-loader',
                    postcssLoader,
                    'sass-loader'
                ].slice(opt.removeCss ? 1 : 0),
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
            'jQuery': 'jquery',
            '$': 'jquery',
            'Popper': 'popper.js',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[name].[hash].css"
        }),
        new VueLoaderPlugin()
    ]
})

module.exports = config