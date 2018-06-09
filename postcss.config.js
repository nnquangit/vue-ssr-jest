module.exports = {
    plugins: [
        require('postcss-import'),
        require('autoprefixer')({
            browsers: [
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 21',
                'safari >= 6',
                'opera >= 23',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10',
                'firefox 47'
            ]
        }),
    ]
}