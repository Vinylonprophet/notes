/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-13 14:53:30
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-21 16:45:46
 * @FilePath: \WEBPACK_CODE\src\js\sum.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function sum(...args) {
    return args.reduce((p, c) => p + c, 0)();
}