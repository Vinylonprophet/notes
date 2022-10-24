/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-24 14:57:03
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-24 17:05:51
 * @FilePath: \CODE-SPLIT\demo3\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sum } from "./math";
// import count from './count';

console.log("hello main");
console.log(sum(1, 2, 3, 4));

document.getElementById('btn').onclick = function(){
    // import 动态导入：会将动态导入的文件代码分割（拆分成单独模块），在需要使用的时候自动加载
    import('./count')
        .then((res) => {
            console.log('加载成功', res.default(3, 1));
        })
        .catch((err) => {
            console.log('模块加载失败', err);
        })
}