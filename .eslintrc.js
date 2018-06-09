// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {browser: true},
    extends: 'standard',
    plugins: ['html'],
    rules: {
        "indent": ["error", 4],
        "no-useless-escape": 'off',
        "no-return-assign": 'off',
        "prefer-promise-reject-errors": 'off',
        "space-before-function-paren": 'off',
        "keyword-spacing": 'off',
        "camelcase": 'off',
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
