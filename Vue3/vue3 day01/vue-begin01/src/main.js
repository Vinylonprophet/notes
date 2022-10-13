/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-10-12 16:08:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-10-12 16:28:29
 * @FilePath: \vue3 day01\vue-begin01\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

// 这里不需要用到Vue.createAPP(App).mount('#app')
// 因为已经直接import了createApp这个方法，有个返回对象，再去用这个对象里面的mount方法，有个链式调用
// 这里挂载的app实际上是index.html里id为app的元素
createApp(App).mount('#app')
