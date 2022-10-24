/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-17 16:29:31
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-24 17:50:41
 * @FilePath: \WEBPACK_CODE\.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    // 继承 Eslint 规则
    extends: ["eslint:recommended"],
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    rules: {
        "no-var": 2, // 不能使用 var 定义变量
    },
    plugins: [
        "import",   // 解决动态导入语法报错
    ]
};