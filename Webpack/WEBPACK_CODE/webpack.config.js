/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-13 16:04:53
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-17 15:28:31
 * @FilePath: \WEBPACK_CODE\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 文件的输出路径，这里的路径要求绝对路径
        // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "dist"),
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
            }
        ]
    },
    // 插件
    plugins: [

    ],
    // 模式
    mode: 'development'
}