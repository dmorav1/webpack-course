const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode:'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
        }
    },
    module:{ 
        rules:[
        
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limits: 100000,
                        MimeType: 'application/font-woff',
                        name: '[name].[contenthash].[ext]',
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,

                    }
                }
            },
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'

        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images',
                }
            ]
        }),
        new Dotenv(),
        
    ],
    

}