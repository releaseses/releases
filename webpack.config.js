var path = require('path'),
    webpack = require('webpack'),
    StatsPlugin = require('stats-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

var devServerPort = process.env.WEBPACK_DEV_SERVER_PORT,
    devServerHost = process.env.WEBPACK_DEV_SERVER_HOST,
    publicPath = process.env.WEBPACK_PUBLIC_PATH

var config = {
    target: 'web',
    entry: {
        web: './apps/web/assets/javascripts/index.js',
        admin: './apps/admin/assets/javascripts/index.js'
    },
    output: {
        path: path.join(__dirname, 'public', 'javascripts'),
        filename: '[name]-[chunkhash].js'
    },
    plugins: [
        new StatsPlugin('webpack_manifest.json')
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }]
    }
}

if (process.env.INBUILT_WEBPACK_DEV_SERVER === 'true') {
    config.devServer = {
        port: devServerPort,
        headers: {'Access-Control-Allow-Origin': '*'}
    }
    config.output.publicPath = '//' + devServerHost + ':' + devServerPort + '/'
}

if (process.env.INBUILT_WEBPACK_DEV_SERVER === 'false') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))
    config.plugins.push(new ExtractTextPlugin('[name].css'))
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }))
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config