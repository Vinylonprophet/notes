/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-13 14:50:55
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-15 14:05:13
 * @FilePath: \WEBPACK_CODE\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import count from './js/count';
import sum from './js/sum';
// 想要 webpack 打包资源，必须引入该资源
import './css/index.css';
import './less/index.less';
import './sass/index.sass';
import './sass/index.scss';

console.log(count(5, 2));
console.log(sum(1, 2, 3, 4, 5));