const os = require("os");
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const threads = os.cpus().length;   // cpu核数

// 用来获取处理样式的loader
function getStyleLoader(pre){
    return [
        // 提取css成单独的文件
        MiniCssExtractPlugin.loader,
        // 将 css 资源编译成 commonjs 的模块到 js 中
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",   // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre,
    ].filter(Boolean)
}

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 文件的输出路径，这里的路径要求绝对路径
        // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),
        // 入口文件打包的输出名称
        filename: 'static/js/main.js',
        // 自动清空上次打包的内容
        // 原理：在打包前，将path整个目录内容清空，再进行打包
        clean: true
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                oneOf: [
                    {
                        // 只检测.css文件
                        test: /\.css$/,
                        // 执行顺序，从右到左（从下到上）
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        // 从右到左
                        // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                        use: getStyleLoader('less-loader'),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader('sass-loader'),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader('stylus-loader')
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                // 小于 10kb 的图片转 base64
                                // 优点：减少请求数量
                                // 缺点：体积会变大
                                maxSize: 10 * 1024 // 10kb
                            }
                        },
                        generator: {
                            // hash 根据文件内容产生一个唯一的 id
                            // ext 文件扩展名————之前扩展名是什么就是什么
                            // query 是携带的其他参数，如果在写url携带一些问号查询参数，那么他也会携带上
                            // 代表 [hash:10] 只取前十位
                            filename: 'static/images/[hash:10][ext][query]'
                        }
                    },
                    {
                        test: /\.(ttf|woff2?|map4|map3|avi)$/,
                        // asset 是将小于某个大小的文件转化为base64，但是字体文件不需要转
                        type: "asset/resource",
                        generator: {
                            // 输出名称
                            filename: 'static/media/[hash:10][ext][query]'
                        }
                    },
                    {
                        test: /\.js$/,
                        // 排除 node_modules中的js文件（不处理）
                        exclude: /(node_modules)/,
                        use: [
                            {
                                loader: 'thread-loader',    // 开启多进程
                                options: {
                                    works: threads,
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    // presets: ['@babel/preset-env']
                                    cacheDirectory: true,   // 开启babel缓存
                                    cacheCompression: false,    // 关闭缓存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"],   // 减少代码体积
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
            threads,
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
    ],
    optimization: {
        // 压缩的操作
        minimizer: [
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js
            new TerserWebpackPlugin({
                parallel: threads, // 开启多进程和设置进程数量
            }),
            // 压缩图片
            new ImageMinimizerPlugin({
                minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                        "svgo",
                        {
                        plugins: [
                            "preset-default",
                            "prefixIds",
                            {
                            name: "sortAttrs",
                            params: {
                                xmlnsOrder: "alphabetical",
                            },
                            },
                        ],
                        },
                    ],
                    ],
                },
                },
            }),
        ]
    },
    // 模式
    mode: 'production',
    devtool: "source-map"
}