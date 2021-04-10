const path = require('path');
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

console.log('IS PROD ', isProd);
console.log('IS DEV ', isDev);
console.log(process.env.NODE_ENV);

const filename = ext => isDev ? `bundle.${ext}` : `bundle[hash].${ext}`;
 console.log(path.resolve(__dirname, 'dist/'));

const jsLoaders = () => {
     const loaders = [
         {
             loader: "babel-loader",
             options: {
                 presets: ['@babel/preset-env'],
                 plugins: ['@babel/plugin-proposal-class-properties']
             }
         }
     ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        // publicPath: 'dist',
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist/')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },

    devtool: isDev ? 'source-map' : false,

    devServer: {
      // contentBase: './dist',
      //  port: 3300,
      //  // inline: false,
      // hot: true,
      //   watchContentBase: true,
    },

    watchOptions: {
        aggregateTimeout: 100,
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/favicon.ico'),
                        to: path.resolve(__dirname, 'dist')
                    }

                ]
        }),
        new MiniCssExtractPlugin( {
            filename: filename('css')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        // new webpack.HotModuleReplacementPlugin(),
     ],
    module: {
        // loaders: [
        //     { test: /\.m?js$/, loader: 'babel-loader'}
        // ],
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                     MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'

                ],
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                // use: {
                //     loader: "babel-loader",
                //     options: {
                //         presets: ['@babel/preset-env']
                //     }
                // }
                use: jsLoaders()
            }

        ],
    },

}

