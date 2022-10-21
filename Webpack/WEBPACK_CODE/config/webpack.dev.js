const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 开发模式没输出，所以不需要指定输出路径
        path: undefined,
        // 入口文件打包的输出名称
        filename: 'static/js/main.js',
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
                        use: [
                            // 将 js 中css通过创建 style 标签添加到 html 中生效
                            "style-loader",
                            // 将 css 资源编译成 commonjs 的模块到 js 中
                            "css-loader"
                        ],
                    },
                    {
                        test: /\.less$/,
                        // 从右到左
                        // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                        use: [ "style-loader", "css-loader", "less-loader" ],
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: [ "style-loader", "css-loader", "sass-loader" ],
                    },
                    {
                        test: /\.styl$/,
                        use: [ "style-loader", "css-loader", "stylus-loader" ],
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
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
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
    ],
    // 开发服务器: 不会输出资源 在内存中编译打包的
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR
    },
    // 模式
    mode: 'development',
    devtool: "cheap-module-source-map"
}