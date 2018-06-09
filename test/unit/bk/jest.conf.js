const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'vue'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\.(css|scss|less)$': '<rootDir>/test/unit/__mocks__/styleMock.js'
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    // snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
    setupFiles: ['<rootDir>/test/unit/setup'],
    coverageDirectory: '<rootDir>/test/unit/coverage',
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/router/index.js',
        '!**/node_modules/**'
    ]
}
