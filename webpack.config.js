const path = require('path');
const sourceMap = true;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const conf = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        overlay: true,
        contentBase: './src',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [
                    {
                        loader: "babel-loader",
                        options: { presets: ["@babel/preset-env"] }
                    }
                ]
            },
            {
                test: /\.sass|scss$/,
                use: ExtractTextPlugin.extract({
                    // fallback: "style-loader",
                    use: [
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
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2)$/,
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
        new ExtractTextPlugin("assets/css/styles.css")
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production ? false : sourceMap && "source-map";

    return conf;
}