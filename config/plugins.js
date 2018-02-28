const path = require('path')
const config = require('./build.config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = [
    
    new FriendlyErrorsWebpackPlugin(),
    
    new HtmlWebpackPlugin({
        title: '',
        filename: 'index.html',
        template: path.resolve(config.src, 'views/index.pug'),
        inject: true,
        minify: {
            collapseWhitespace: true,
            conservativeCollapse: true,
            preserveLineBreaks: true,
            useShortDoctype: true,
            html5: true
        },
        mobile: true
    }),
    
    new webpack.NamedModulesPlugin(),
    
    new webpack.HotModuleReplacementPlugin(),
    
    /*new webpack.SourceMapDevToolPlugin({
        test: /\.(js|css|vue)$/,
        filename: '[name].map'
    }),*/
    
    new webpack.DefinePlugin({
        'typeof window': '"object"',
        'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    })
    
]
