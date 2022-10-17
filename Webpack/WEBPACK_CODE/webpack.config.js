/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-13 16:04:53
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-15 14:03:19
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
        // 文件的输出名称
        filename: 'main.js'
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
        ]
    },
    // 插件
    plugins: [

    ],
    // 模式
    mode: 'development'
}