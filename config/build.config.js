const fs = require('fs')
const path = require('path')

const resolve = dir => path.resolve(__dirname, '..', dir)

const buildConfig = {
    
    src: resolve('src'),
    dist: resolve('public'),
    test: '' /*resolve('test')*/
    
}


module.exports = buildConfig
