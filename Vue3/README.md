# Vue3

## 基础

### 创建第一个应用

**通过手动导入一个vue3的js进行初步体验**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="vue3.js"></script>
</head>
<body>
    <div id="counter">
        <!-- {{}}是vue的语法，告诉vue，这里存放了一个变量 -->
        <p>{{num}}</p>
        <p>{{uname}}</p>
    </div>
    <script>
        // 配置对象
        const Counter = {
            // data变量名是固定的
            data: function(){
                return{
                    num: 0,
                    uname: '张三'
                }
            }
        }

        // 创建应用，传入配置对象
        // mount进行挂载，和id为counter的元素相关联
        let app = Vue.createApp(Counter).mount('#counter');
        
        // log出proxy这个代理对象
        console.log('app:', app);

        // Proxy下面的num和uname可以直接修改
        // 比如在Console打app.num就可以直接进行修改，也被称为数据的双向绑定
    </script>
</body>
</html>
```



#### Vite

- Vite 是一个轻量级的、速度极快的构建工具，对 Vue SFC 提供第一优先级支持
- Vite 是一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的冷服务器启动

**注意：**这里由于不是脚手架搭建的，所以还是需要install一下



##### 组成

| 组成部分     | 功能                   |
| ------------ | ---------------------- |
| node_modules | 存放一些项目的依赖等等 |
| public       | 存放一些静态资源       |
| src          | 源代码部分             |
| src/main.js  | 入口文件               |



##### 解读main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

// 这里不需要用到Vue.createAPP(App).mount('#app')
// 因为已经直接import了createApp这个方法，有个返回对象，再去用这个对象里面的mount方法，有个链式调用
// 这里挂载的app实际上是index.html里id为app的元素
createApp(App).mount('#app')
```



##### 解读App.vue

vue用到了单文件组件引用，意味html，css，script可以写在一个文件里



#### 声明式渲染

vue.js 的核心是一个允许采用简介模板语法来声明式地将数据渲染进 DOM 的系统

声明式渲染就是先规范模板，再填入数据或者修改数据，可以提高开发效率

```javascript
export default{
  data(){
    return{
      name: 'Vinylon'
    }
  }
}
```



#### 应用实例

每个 Vue 应用都是通过函数创建一个新的 **应用实例**：

```javascript
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```



#### 根组件

```javascript
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```



#### 挂载应用

应用实例必须调用.mount()方法才会渲染出来

```html
<div id="app"></div>
```

```javascript
app.mount('#app')
```



#### Dom中的根组件模板

在挂载容器中直接书写根组件模板

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```javascript
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```



### 模板语法

#### 文本插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即`双大括号`)：

```html
<span>Message: {{ msg }}</span>
```



##### v-once

一次性的执行插值，当数据改变时，插值处的内容不会更新

```vue
<script>
export default{
  data(){
    return{
      name: 'Vinylon'
    }
  },
  methods:{
    changeName(){
      this.name = "Melody"
    }
  }
}
</script>

<template>
  <div>
    <span>{{ name }}</span>
    <br>
    <span v-once>{{ name }}</span>
    <br>
    <button @click="changeName">ChangeName</button>
  </div>
</template>
```



#### 原始HTML

双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 `v-html` 指令：

```html
<script>
export default{
  data(){
    return{
      msg: '<h2>标题</h2>'
    }
  }
}
</script>

<template>
  <div>
    <br>
    {{ msg }}
    <br>
    <span v-html="msg"></span>
  </div>
</template>
```

**注意：**在网站上动态渲染任意 HTML 是非常危险的，因为这非常容易造成 [XSS 漏洞](https://en.wikipedia.org/wiki/Cross-site_scripting)。请仅在内容安全可信时再使用 `v-html`，并且**永远不要**使用用户提供的 HTML 内容



#### Attribute绑定

Mustache 不能在 HTML attributes 中使用，响应式地绑定一个attribute应该使用 `v-bind` 指令：

```html
<div v-bind:id="dynamicId"></div>
<!-- 简写 -->
<div :id="dynamicId"></div>
```



##### 布尔型 Attribute

布尔型 依据 true / false 值来决定 attribute 是否应该存在于该元素上。`disabled` 就是最常见的例子之一

```html
<button :disabled="isButtonDisabled">Button</button>
```



##### 动态绑定多个值

一个包含多个 attribute 的 JavaScript 对象，可以通过不带参数的 `v-bind`，你可以将它们绑定到单个元素上

```html
<script>
export default{
    data() {
        return {
            objectOfAttrs: {
                id: 'container',
                class: 'wrapper'
            }
        }
    }
}
</script>

<div v-bind="objectOfAttrs"></div>
```



#### 使用 JavaScript 表达式

Vue 所有的数据绑定中都支持完整 JavaScript 表达式

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```



##### 仅支持表达式

每个绑定仅支持**单一表达式**，也就是一段能够被求值的 JavaScript 代码。一个简单的判断方法是是否可以合法地写在 `return` 后面

下面是无效例子：

```html
<!-- 这是一个语句，而非表达式 -->
{{ var a = 1 }}

<!-- 条件控制也不支持，请使用三元表达式 -->
{{ if (ok) { return message } }}
```



##### 调用函数

绑定的表达式中使用一个组件暴露的方法：

```html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

**Tip：**绑定在表达式中的方法在组件每次更新时都会被重新调用，因此**不**应该产生任何副作用，比如改变数据或触发异步操作

