const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENTRY_NAME = 'app'
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isProd = NODE_ENV === 'production';
// const OUT_DIR = path.join(__dirname, 'build')
const NAME = '[name]' + (NODE_ENV === 'development' ? '' : '_[chunkhash]')

const extractCSS = new ExtractTextPlugin(`${NAME}.css`)
console.log(__dirname)

const config = {
    entry: {
        app: './js/app.js',
        style: './less/style.less',
    },

    output: {
        path: path.join(__dirname, 'sources'),
        filename: `${NAME}.js`,
    },

    devtool: 'source-map',

    plugins: [
        // Вынос CSS/LESS в отдельный файл
        extractCSS,

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
            },
            PRODUCTION: isProd,
            DEVELOPMENT: !isProd
        }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        [ 'es2015', { 'modules': false } ],
                        'stage-0'
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader']
                })
            },
            {
                test: /\.less$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader', 'less-loader?noIeCompat']
                })
            },
            { test: /\.(png|jpg|ttf|eot|svg|woff|woff2)$/i, use: `file-loader?name=${ENTRY_NAME}-[name].[ext]`},
        ]
    },
}

module.exports = config