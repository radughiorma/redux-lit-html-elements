const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        demo: './src/demo/demo.ts',
        todoitem: './src/todo-item/todo-item.ts',
        todolist: './src/todo-list/todo-list.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        compress: false,
        https: false
    },
    module: {

        rules: [
            {
                test: /\.test.tsx?$/,
                use: 'mocha-loader',

                exclude: [path.resolve(__dirname, 'node_modules')]
            }, {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [path.resolve(__dirname, 'node_modules')]
            }, {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['syntax-dynamic-import', 'transform-async-to-generator']
                }
                /*
                            options: {
                                presets: ['env', {
                                    modules: false
                                }],
                            }
                */
            }, {
                test: /\.css$/,

                use: [{
                    loader: 'style-loader',

                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'css-loader'
                }]
            }]
    },

    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Fancy Redux ToDo App'
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        // filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }


    /*
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                minChunks: 1,
                name: true,

                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }
        }
    */
}