var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: path.join(__dirname, './src/index'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].min.js'
    },
    devtool:'inline-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './index.html'),
            chunks: ['index']
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: {
        "react": 'React',
        'react-dom': 'ReactDOM'
    }
}