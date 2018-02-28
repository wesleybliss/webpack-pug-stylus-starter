const path = require('path')
const config = require('./build.config')
const basicAuth = require('./basic-auth')
const package = require('../package.json')

const resolve = dir => path.resolve(config.src, dir)

const packageDepsMerged = []

if (package.dependencies && package.dependencies.length)
    packageDepsMerged = { ...packageDepsMerged, ...package.dependencies }

if (package.devDependencies && package.devDependencies.length)
    packageDepsMerged = { ...packageDepsMerged, ...package.devDependencies }

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        app: resolve('js/app.js'),
        vendors: Object.keys(packageDepsMerged)
    },
    output: {
        path: config.dist,
        publicPath: '/',
        filename: 'app.js',
        /*devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'*/
        devtoolModuleFilenameTemplate: info => {
            /*fs.appendFile(
                path.resolve(__dirname, 'webpack.log'),
                JSON.stringify(info, null, '    '),
                err => { if (err) console.error(err) })*/
            return `webpack:///${info.resourcePath}`
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    // stats: 'minimal',
    stats: {
        children: false
    },
    devtool: 'inline-eval-cheap-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: config.dist,
        compress: true,
        historyApiFallback: true,
        stats: 'errors-only',
        hot: true,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }/*,
        before(app) {
            app.use(basicAuth('Nitrade', 'foo', 'NitradeDemo2017'))
        }*/
    },
    module: {
        rules: require('./rules')
    },
    resolve: {
        extensions: ['.js', '.pug', '.styl'],
        modules: [
            'node_modules'
        ],
        alias: {
            '@': config.src,
            '@src': config.src,
            '@styles': path.resolve(config.src, 'styles'),
            '@images': path.resolve(config.src, 'images')
        }
    },
    plugins: require('./plugins'),
    externals: {
        jquery: 'jQuery'
    }
}
