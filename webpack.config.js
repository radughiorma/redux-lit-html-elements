const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

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
        // testmdc: './src/testmdc.ts',
        demo: './src/demo/demo.ts',
        app: './src/scss/app.scss',
        todoitem: './src/todo-item/todo-item.ts',
        addtodo: './src/add-todo-item/add-todo-item.ts',
        //todolist: './src/todo-list/todo-list.ts'
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
                    loader: 'file-loader',
                    options: {
                        name: 'css/[name].css',
                    }
                },{
                    loader: 'style-loader',

                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'css-loader',

                    options: {
                        sourceMap: true
                    }

                }]
            }, {
                rules: [{
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader/url',

                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'css/[name].css'
                            }
                        },
                        { loader: 'extract-loader' },
                        { loader: 'css-loader' },
                      /*  { loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer()]
                            }
                        },*/
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ['./node_modules']
                            }
                        },
                    ]
                }]
            }]
    },

    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.html','.css,', '.scss']
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
   /*     new HtmlWebpackPlugin({
            title: 'Fancy Redux ToDo App',
            files: {
                css: ['./dist/css/app.css'],
                js: ['testmdc.js'],
                chunks: {
                    head: {
                        css: ['./dist/css/app.css']
                    }
                }

            }

        }),*/
        new HtmlWebpackPlugin({
            filename: 'testmdc.html',
            template: './src/testmdc.html',
            files: {
                css: ['./dist/css/app.css'],
                js: ['testmdc.js'],
                chunks: {
                    head: {
                        css: ['./dist/css/app.css']
                    }
                }

            }


        }),
        new HtmlWebpackPlugin({
            title:'Redux Lit Html Elements',
            filename: 'demo.html',
            template: './src/demo/demo.html',
            assets: {
                style: 'app.css'
            },
            publicPath: '/demo',



        }),
        new TypedocWebpackPlugin({
            out : './dist/docs',
            tsconfig: './tsconfig.json',
            include: './src'
        })
    ],
    output: {
        filename: 'js/[name].[chunkhash].js',
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