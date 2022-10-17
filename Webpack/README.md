# Webpack

## 基础配置

### 基本使用

webpack是一个静态资源打包工具

会以一个或多个文件作为打包的入口，将整个项目所以后文件编译组合成一个或多个文件输出出去。

输出文件就是编译好的文件，可以在浏览器端运行

**我们将 `webpack` 输出的文件叫做 `bundle`**



##### 功能介绍

webpack 本身功能是有限的：

- 开发模式：仅能编译 JS 中的 `ES Module` 语法
- 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

**注意：**样式文件处理不了，所以得学习webpack的其他配置



##### 开始使用

###### 1. 资源目录

```
webpack_code # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
        ├── js # js文件目录
        │   ├── count.js
        │   └── sum.js
        └── main.js # 项目主文件
```



###### 2. 创建文件

以下三个JavaScript文件均在 `src` 文件夹下创建

- count.js

  ```javascript
  export default function count(x, y) {
    return x - y;
  }
  ```

- sum.js

  ```javascript
  export default function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
  }
  ```

- main.js

  ```javascript
  import count from "./js/count";
  import sum from "./js/sum";
  
  console.log(count(2, 1));
  console.log(sum(1, 2, 3, 4));
  ```



这时候创建一个public文件夹，下面再创建一个index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack</title>
</head>
<body>
    <h1>hello webpack</h1>
    <script src="../src/main.js"></script>
</body>
</html>
```

**注意：**这时候发现浏览器会报错，因为ES6模块化在浏览器并不识别



###### 3.下载依赖

打开终端，项目根目录，运行：

- 初始化 package.json

  ```
  npm init -y
  ```

  此时会生成一个基础的 `package.json`

  **注意：**package.json 中的 name 不能叫 webpack， 因为之后还要安装 webpack

- 下载依赖

  ```
  npm i webpack webpack-cli -D
  ```

  

###### 4. 启动 Webpack

- 开发模式

  ```
  npx webpack ./src/main.js --mode=development
  ```

- 生产模式

  ```
  npx webpack ./src/main.js --mode=production
  ```

**注意：**

- npm是用来下载包的，npx会将node_modules中的.bin临时添加为环境变量，这样就可以临时访问此文件夹下的webpack指令了
- ./src/main.js   指的是打包入口，当然也包括其他的依赖
- --mode=xxx   指定模式（环境）



###### 5. 观察输出文件

默认 `Webpack` 会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下文件情况就好了

**注意：**这里我们可以看到ES6的一些箭头语法还是存在的，因为上文也有提到，webpack只能编译模块化语法，并不能编译其他语法



之后把index.html的script改成：

```html
<script src="../dist/main.js"></script>
```

就成功能运行了



如果尝试生产模式，打包出来的结果如下：

```javascript
(()=>{"use strict";console.log(3),console.log([1,2,3,4,5].reduce(((o,e)=>o+e),0))})();
```

匿名函数，防止命名冲突；能压缩的函数都进行了压缩，比如减法函数直接给结果，reduce直接变成了一个普通的运算



### 基本配置

#### 五个核心概念

##### 1. entry(入口)

指Webpack从哪个文件开始进行打包

##### 2. output(输出)

指示 Webpack 打包完的文件输出到哪里去，如何命名等

##### 3. loader(加载器)

Webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

##### 4. plugins(插件)

扩展 Webpack 功能

##### 5. mode(模式)

- 开发模式：development
- 生产模式：production



#### 准备 Webpack 配置文件

在项目根目录下新建文件：webpack.config.js

```javascript
module.exports = {
    // 入口
    entry: "",
    // 输出
    output: {},
    // 加载器
    module: {
    rules: [],
    },
    // 插件
    plugins: [],
    // 模式
    mode: "",
};
```

Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范



#### 修改配置文件

##### 1. 配置文件

```javascript
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
        ]
    },
    // 插件
    plugins: [

    ],
    // 模式
    mode: 'development'
}
```



##### 2. 运行指令

```
npx webpack
```

此时的功能和之前一样



### 开发模式介绍

开发模式就是开发代码时使用的模式

这个模式下做两件事情：

1. 编译代码，是浏览器能够识别

   开发时我们有样式资源、字体图标、图片资源、html资源等，webpack默认不能处理这些资源，所以我们要加载配置来编译这些资源
   
2. 代码质量检查，树立代码规范

   提前检查代码的一些隐患，让代码运行时更加健壮

   提前检查代码规范和格式，统一团队编码风格，让代码更加优雅美观



### 处理样式资源

本章学习使用 Webpack 如何处理 Css、Less、Sass、Style 样式资源



#### 介绍

Webpack 本身不能识别样式资源，所以需要借助 Loader 来帮助 Webpack 解析样式资源

我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用

官方文档找不到，可以从社区的 Github 中搜索查找

[Webpack 官方 Loader 文档](https://webpack.docschina.org/loaders/)



#### 处理 Css 资源

##### 1. 下载包

```
npm i css-loader style-loader -D
```

**注意：**需要下载两个loader



##### 2. 功能介绍

- css-loader ：负责将 Css 文件编译成 Webpack 能识别的模块
- style-loader ：会动态创建一个 Style 标签，里面放置 Webpack 中 Css 模块内容

此时样式就会以 Style 标签的形式在页面上生效



##### 3. 配置

```javascript
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
                test: /\.css$/i,
                // 执行顺序，从右到左（从下到上）
                use: [
                    // 将 js 中css通过创建 style 标签添加到 html 中生效
                    "style-loader", 
                    // 将 css 资源编译成 commonjs 的模块到 js 中
                    "css-loader"
                ],
            },
        ]
    },
    // 插件
    plugins: [

    ],
    // 模式
    mode: 'development'
}
```



##### 4. 添加 Css 资源

- src/css/index.css

  ```css
  .box1 {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
  ```

- src/main.js

  ```javascript
  import count from './js/count';
  import sum from './js/sum';
  // 想要 webpack 打包资源，必须引入该资源
  import './css/index.css';
  
  console.log(count(5, 2));
  console.log(sum(1, 2, 3, 4, 5));
  ```

- public/index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>webpack5</title>
    </head>
    <body>
      <h1>Hello Webpack5</h1>
      <!-- 准备一个使用样式的 DOM 容器 -->
      <div class="box1"></div>
      <!-- 引入打包后的js文件，才能看到效果 -->
      <script src="../dist/main.js"></script>
    </body>
  </html>
  ```



##### 5. 运行指令

```
npx webpack
```



#### 处理 Less 资源

##### 1. 下载包

```
npm i less-loader -D
```



##### 2. 功能介绍

- less-loader ：负责将 Less 资源文件编译成 Css文件



##### 3. 配置

```javascript
// 加载器
module: {
    rules: [
        // loader的配置
        {
            // 只检测.css文件
            test: /\.css$/i,
            // 执行顺序，从右到左（从下到上）
            use: [
                // 将 js 中css通过创建 style 标签添加到 html 中生效
                "style-loader",
                // 将 css 资源编译成 commonjs 的模块到 js 中
                "css-loader"
            ],
        },
        {
            test: /\.less$/i,
            // 从右到左
            // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
            use: [ "style-loader", "css-loader", "less-loader" ],
        },
    ]
},
```



##### 4. 添加 Less 资源

- src/less/index.less

  ```css
  .box2 {
      width: 100px;
      height: 100px;
      background-color: aqua;
  }
  ```

- src/main.js

  ```javascript
  import count from './js/count';
  import sum from './js/sum';
  // 想要 webpack 打包资源，必须引入该资源
  import './css/index.css';
  import './less/index.less';
  
  console.log(count(5, 2));
  console.log(sum(1, 2, 3, 4, 5));
  ```

- public/index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>webpack</title>
  </head>
  <body>
      <h1>hello webpack</h1>
      <div class="box1"></div>
      <div class="box2"></div>
      <script src="../dist/main.js"></script>
  </body>
  </html>
  ```



##### 5. 运行指令

```
npx webpack
```



#### 处理 Sass 和 Scss 资源

##### 1. 下载包

```
npm i sass-loader sass -D
```



##### 2. 功能介绍

- sass-loader ：负责将 Sass 文件编译成 css 文件
- sass ：sass-loader 依赖 sass 进行编译



##### 3. 配置

```javascript
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
```



##### 4. 添加 Sass 资源