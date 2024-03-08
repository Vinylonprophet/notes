/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 14:08:30
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 15:12:36
 * @FilePath: \rxjs-tutorial\src\rxjs\chapter8.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import { forkJoin, from } from 'rxjs';

// http://localhost:7878/first
// http://localhost:7878/users

// 拦截只要data
axios.interceptors.response.use(response => response.data)

forkJoin({
  first: from(axios.get('localhost:7878/first')),
  users: from(axios.get('localhost:7878/users')),
}).subscribe(console.log);

// console.log(axios.get('http://localhost:7878/first'));

