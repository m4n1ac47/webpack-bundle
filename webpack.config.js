/* global require __dirname module */
const path = require('path');
const webpack = require('webpack');
const sourceMap = true;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true,
        hot: true
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.sass|scss$/,
                use: [
                    {   
                        // loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap }
                    },
                    {
                        loader: "postcss-loader",
                        options: { sourceMap }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../dist/assets/images/',
                            outputPath: 'assets/images/'
                        }
                    }]
            },
            {
                test: /\.(woff2|woff)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: '../dist/assets/fonts/',
                        outputPath: 'assets/fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: 'bundle.css'
        //   }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production ? false : sourceMap && "source-map";

    return conf;
}