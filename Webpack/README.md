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

- src/sass/index.sass

  ```
  .box3
      width: 100px
      height: 100px
      background-color: pink
  ```

- src/sass/index.scss

  ```scss
  .box4 {
      width: 100px;
      height: 100px;
      background-color: aquamarine;
  }
  ```

- src/main.js

  ```javascript
  import count from './js/count';
  import sum from './js/sum';
  // 想要 webpack 打包资源，必须引入该资源
  import './css/index.css';
  import './less/index.less';
  import './sass/index.sass';
  import './sass/index.scss';
  
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
      <div class="box3"></div>
      <div class="box4"></div>
      <script src="../dist/main.js"></script>
  </body>
  </html>
  ```



##### 5. 运行指令

```
npx webpack
```



#### 处理 Styl 资源

##### 1. 下载包

```
npm i stylus-loader -D
```



##### 2. 功能介绍

- stylus-loader ：负责将 Styl 文件编译成 Css 文件



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
        {
            test: /\.styl$/,
            use: [ "style-loader", "css-loader", "stylus-loader" ],
        }
    ]
},
```



##### 4. 添加 Styl 资源

- src/styl/index.styl

  ```stylus
  .box5 
    width 100px 
    height 100px 
    background-color yellowgreen
  ```

- src/main.js

  ```javascript
  import count from './js/count';
  import sum from './js/sum';
  // 想要 webpack 打包资源，必须引入该资源
  import './css/index.css';
  import './less/index.less';
  import './sass/index.sass';
  import './sass/index.scss';
  import './stylus/index.styl';
  
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
      <div class="box3"></div>
      <div class="box4"></div>
      <div class="box5"></div>
      <script src="../dist/main.js"></script>
  </body>
  </html>
  ```



##### 5. 运行指令

```
npx webpack
```



### 处理图片资源

在 Webpack4 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

现在 Webpack5 已经将两个 loader 功能内置到 Webpack 中，只需要简单配置就可以处理图片资源

#### 1. 配置

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
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
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



#### 2. 添加图片资源

- src/images/avater



#### 3. 使用图片资源

- src/css/index.css

```css
.box1 {
    width: 100px;
    height: 100px;
    background-image: url('../images/avatar.JPG');
    background-size: cover;
}
```



#### 4. 运行指令

```
npx webpack
```



#### 5. 输出资源情况

查看dist，多出一张图片资源，因为 Webpack 会将所有打包好的资源输出到 dist 目录下

- 为什么样式资源没有？

因为 style-loader 会把样式资源打包到 main.js 中，所以没有额外输出



#### 6. 对图片资源进行优化

将小于某个大小的图片转化成 data URI 形式（Base64 格式）

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
            }
        }
    ]
}
```

- 优点：减少请求数量
- 缺点：体积会变大

此时满足大小条件的图片就会以 data URI 形式内置到 js 中（注意：需要将上次打包生成的文件清空，再重新打包才有效果）



### 修改输出资源的名称和路径

#### 1. 配置

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
        // 入口文件打包的输出名称
        filename: 'static/js/main.js'
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
            }
        ]
    },
    // 插件
    plugins: [

    ],
    // 模式
    mode: 'development'
}
```



#### 2. 修改 index.html

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
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <script src="../dist/static/js/main.js"></script>
</body>
</html>
```



#### 3. 运行指令

```
npx webpack
```

- 此时输出的文件目录

```
├── dist
    └── static
         ├── imgs
         │    └── 7003350e.png
         └── js
              └── main.js
```



### 自动清空上次打包资源

#### 1. 配置

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
            }
        ]
    },
    // 插件
    plugins: [

    ],
    // 模式
    mode: 'development'
}
```



#### 2. 运行指令

```
npx webpack
```



### 处理字体图标资源

#### 1. 下载字体图标文件

1.  打开[阿里巴巴矢量图标库](https://www.iconfont.cn/)
2.  选择想要的图标添加到购物车，统一下载到本地



#### 2. 添加字体图标资源

- src/fonts/iconfont.ttf

- src/fonts/iconfont.woff

- src/fonts/iconfont.woff2

- src/css/iconfont.css

  - 注意字体文件路径需要修改

- src/main.js

  ```javascript
  import count from './js/count';
  import sum from './js/sum';
  // 想要 webpack 打包资源，必须引入该资源
  import './css/iconfont.css';
  import './css/index.css';
  import './less/index.less';
  import './sass/index.sass';
  import './sass/index.scss';
  import './stylus/index.styl';
  
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
      <div class="box3"></div>
      <div class="box4"></div>
      <div class="box5"></div>
      <span class="iconfont icon-biji"></span>
      <span class="iconfont icon-shoucang"></span>
      <script src="../dist/static/js/main.js"></script>
  </body>
  </html>
  ```



#### 3. 配置

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
                test: /\.(ttf|woff2?)$/,
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
```

**注意：**`type:"asset/resource"` 和 `type: "asset"` 的区别：

1. `type:"asset/resource"` 相当于 `file-loader`，将文件转化成 Webpack 能识别的资源，其他不做处理
2. `type: "asset"` 相当于 `url-loader`，将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式



#### 4. 运行指令

```
npx webpack
```



### 处理其他资源

开发中还有一些其他资源，比如音视频等

#### 1. 配置

就是在处理字体图标资源基础上增加其他文件类型，进行统一处理

```javascript
// 加载器
module: {
    rules: [
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
```



#### 2. 运行指令

```
npx webpack
```



### 处理 js 资源

webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以需要做一些兼容处理

其次在开发中，团队对代码格式有严格要求，不能用肉眼去检测代码格式，需要用专业的工具来检测

- 针对 js 兼容性处理，我们使用 Babel 完成
- 针对代码格式，我们使用 Eslint 完成

我们先完成 Eslint，检测代码格式无误后，再由 Babel 做代码兼容性处理



#### Eslint

可组装的 JavaScript 和 JSX 检查工具。

这句话意思就是：它是用来检测 js 和 jsx 语法的工具，可以配置各项功能

我们使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查



##### 1. 配置文件

- `.eslintrc.*`：新建文件，位于项目根目录
  - `.eslintrc`
  - `.eslintrc.js`
  - `.eslintrc.json`
  - 区别在于配置格式不同
- `package.json` 中 `eslintConfig`：不需要创建文件，在原有文件基础上写

ESLint 会查找和自动读取，所以以上配置文件只需要存在一个即可



##### 2. 具体配置

以 `.eslintrc.js` 为例：

```javascript
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: [],
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
```

1.  parserOptions 解析选项

   ```
   parserOptions: {
     ecmaVersion: 6, // ES 语法版本
     sourceType: "module", // ES 模块化
     ecmaFeatures: { // ES 其他特性
       jsx: true // 如果是 React 项目，就需要开启 jsx 语法
     }
   }
   ```

2.  rules 具体规则

   - `"off"` 或 `0` - 关闭规则
   - `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
   - `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

   ```
   rules: {
     semi: "error", // 禁止使用分号
     'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
     'default-case': [
       'warn', // 要求 switch 语句中有 default 分支，否则警告
       { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
     ],
     eqeqeq: [
       'warn', // 强制使用 === 和 !==，否则警告
       'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
     ],
   }
   ```

   **详见：**[规则文档](https://eslint.bootcss.com/docs/rules/)

3.  extends 继承

   开发中一点点写 rules 规则太费劲了，所以有更好的办法，继承现有的规则。

   现有以下较为有名的规则：

   - [Eslint 官方的规则open in new window](https://eslint.bootcss.com/docs/rules/)：`eslint:recommended`
   - [Vue Cli 官方的规则open in new window](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-eslint)：`plugin:vue/essential`
   - [React Cli 官方的规则open in new window](https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app)：`react-app`

   ```javascript
   // 例如在React项目中，我们可以这样写配置
   module.exports = {
     extends: ["react-app"],
     rules: {
       // 我们的规则会覆盖掉react-app的规则
       // 所以想要修改规则直接改就是了
       eqeqeq: ["warn", "smart"],
     },
   };
   ```



##### 3. 在 Webpack 中使用

1. 下载包

   ```
   npm i eslint-webpack-plugin eslint -D
   ```

2.  定义 Eslint 配置文件

   - .eslintrc.js

     ```javascript
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
     };
     ```

3.  修改 js 文件代码

   - main.js

     ```javascript
     import count from './js/count';
     import sum from './js/sum';
     // 想要 webpack 打包资源，必须引入该资源
     import './css/iconfont.css';
     import './css/index.css';
     import './less/index.less';
     import './sass/index.sass';
     import './sass/index.scss';
     import './stylus/index.styl';
     
     const result = count(2, 1);
     console.log(result);
     console.log(count(5, 2));
     console.log(sum(1, 2, 3, 4, 5));
     ```

4.  配置

   - webpack.config.js

     ```javascript
     const path = require("path");
     const ESLintPlugin = require('eslint-webpack-plugin');
     
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
             new ESLintPlugin({
                 // context 检测哪些文件
                 // context: path.resolve(__dirname, "src"),
             }),
         ],
         // 模式
         mode: 'development'
     }
     ```

5.  运行指令

   ```
   npx webpack
   ```



##### 4. VSCode Eslint 插件

下载 VSCode 的 Eslint 插件，不需要编译就能看到错误，可以在编译之前就解决

但是此时就会对项目所有文件默认进行 Eslint 检查了，我们 dist 目录下的打包后文件就会报错。但是我们只需要检查 src 下面的文件，不需要检查 dist 下面的文件

所以可以使用 Eslint 忽略文件解决。在项目根目录新建下面文件：

- `.eslintignore`

  ```
  # 忽略dist目录下所有文件
  dist
  ```



#### Babel

主要用于将 ES6 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中

##### 1. 配置文件

多种写法：

- babel.config.* ：新建文件，位于项目根目录
  - babel.config.js
  - babel.config.json
- .babelrc.* ：新建文件，位于项目根目录
  - .babelrc
  - .babelrc.js
  - .babelrc.json
- package.json 中 babel ：不需要创建文件，只需要在原有文件基础上写

Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可



##### 2. 具体配置

`babel.config.js` 配置文件为例：

```javascript
module.exports = {
    // 预设
    presets: [],
};
```

presets 预设

简单理解：就是一组 Babel 插件, 扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设



##### 3. 在 Webpack 中使用

1. 下载包

   ```
   npm i babel-loader @babel/core @babel/preset-env -D
   ```

2. 定义 Babel 配置文件

   babel.config.js

   ```javascript
   module.exports = {
   	presets: ["@babel/preset-env"],
   };
   ```

3. 配置

   webpack.config.js

   ```javascript
   const path = require("path");
   const ESLintPlugin = require('eslint-webpack-plugin');
   
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
               },
               {
                   test: /\.js$/,
                   // 排除 node_modules中的js文件（不处理）
                   exclude: /(node_modules)/,
                   loader: 'babel-loader',
                   options: {
                       presets: ['@babel/preset-env']
                   }
               }
           ]
       },
       // 插件
       plugins: [
           new ESLintPlugin({
               // context 检测哪些文件
               context: path.resolve(__dirname, "src"),
           }),
       ],
       // 模式
       mode: 'development'
   }
   ```

4.  运行指令

   ```
   npx webpack
   ```



### 处理 Html 资源

#### 1. 下载包

```
npm i html-webpack-plugin -D
```



#### 2. 配置

```javascript
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            },
            {
                test: /\.js$/,
                // 排除 node_modules中的js文件（不处理）
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "src"),
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "public/index.html"),
        })
    ],
    // 模式
    mode: 'development'
}
```



#### 3. 修改 index.html

去掉引入的 js 文件，因为 HtmlWebpackPlugin 会自动引入

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
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <span class="iconfont icon-biji"></span>
    <span class="iconfont icon-shoucang"></span>
    <!-- 手动引入不需要，通过插件自动引入 -->
    <!-- <script src="../dist/static/js/main.js"></script> -->
</body>
</html>
```



#### 4. 运行指令

```
npx webpack
```



### 开发服务器&自动化

每次写完代码都需要手动输入指令才能编译代码，太麻烦了，我们希望一切自动化

#### 1. 下载包

```
npm i webpack-dev-server -D
```



#### 2. 配置

- webpack.config.js

  ```javascript
  const path = require("path");
  const ESLintPlugin = require('eslint-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  
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
              },
              {
                  test: /\.js$/,
                  // 排除 node_modules中的js文件（不处理）
                  exclude: /(node_modules)/,
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          ]
      },
      // 插件
      plugins: [
          new ESLintPlugin({
              // context 检测哪些文件
              context: path.resolve(__dirname, "src"),
          }),
          new HtmlWebpackPlugin({
              // 模板：以public/index.html文件创建新的html文件
              // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
              template: path.resolve(__dirname, "public/index.html"),
          }),
          new BundleAnalyzerPlugin({
              analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
              generateStatsFile: true, // 是否生成stats.json文件
          }),
      ],
      // 开发服务器: 不会输出资源 在内存中编译打包的
      devServer: {
          host: "localhost", // 启动服务器域名
          port: "3000", // 启动服务器端口号
          open: true, // 是否自动打开浏览器
      },
      // 模式
      mode: 'development'
  }
  ```



#### 3. 运行指令

```
npx webpack serve
```

**指令发生了变化**

并且当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。

开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道



### 生产模式介绍

生产模式是开发完代码后，我们需要得到代码将来部署上线

这个模式下对代码进行优化，让其运行性能更好

优化的两个角度出发：

1. 优化代码运行性能
2. 优化代码打包速度



#### 生产模式准备

我们分别准备两个配置文件来放不同的配置

##### 1. 文件目录

```
├── webpack-test (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── .eslintrc.js(Eslint配置文件)
    ├── babel.config.js(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
```



##### 2. 修改 webpack.dev.js

因为文件目录变了，所以所有绝对路径需要回退一层目录才能找到对应的文件

```javascript
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 开发模式没输出，所以不需要指定输出路径
        path: undefined,
        // 入口文件打包的输出名称
        filename: 'static/js/main.js',
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
            },
            {
                test: /\.js$/,
                // 排除 node_modules中的js文件（不处理）
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "../src"),
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        }),
    ],
    // 开发服务器: 不会输出资源 在内存中编译打包的
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
    },
    // 模式
    mode: 'development'
}
```

运行开发模式的指令：

```
npx webpack serve --config ./config/webpack.dev.js
```



##### 3. 修改 webpack.prod.js

```javascript
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 文件的输出路径，这里的路径要求绝对路径
        // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),
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
            },
            {
                test: /\.js$/,
                // 排除 node_modules中的js文件（不处理）
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "../src"),
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        }),
    ],
    // 模式
    mode: 'production'
}
```

运行生产模式的指令：

```
npx webpack --config ./config/webpack.prod.js
```



##### 4. 配置运行指令

为了方便运行不同模式的指令，我们将指令定义在 package.json 中 scripts 里面

```javascript
"scripts": {
    "start": "npm run dev",
    "generateAnalyzFile": "webpack --profile --json > stats.json",
    "analyz": "webpack-bundle-analyzer --port 8888 ./dist/stats.json",
    "dev": "webpack serve --config ./config/webpack.dev.js",
    "build": "webpack --config ./config/webpack.prod.js"
},
```



### Css 处理

#### 提取 Css 成单独文件

Css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式

这样对于网站来说，会出现闪屏现象，用户体验不好

我们应该是单独的 Css 文件，通过 link 标签加载性能才好

##### 1. 下载包

```
npm i mini-css-extract-plugin -D
```



##### 2. 配置

- webpack.prod.js

  ```javascript
  const path = require("path");
  const ESLintPlugin = require('eslint-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  
  module.exports = {
      // 入口
      entry: './src/main.js',
      // 输出
      output: {
          // 文件的输出路径，这里的路径要求绝对路径
          // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
          path: path.resolve(__dirname, "../dist"),
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
                      // 提取css成单独的文件
                      MiniCssExtractPlugin.loader,
                      // 将 css 资源编译成 commonjs 的模块到 js 中
                      "css-loader"
                  ],
              },
              {
                  test: /\.less$/,
                  // 从右到左
                  // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                  use: [ MiniCssExtractPlugin.loader, "css-loader", "less-loader" ],
              },
              {
                  test: /\.s[ac]ss$/,
                  use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
              },
              {
                  test: /\.styl$/,
                  use: [ MiniCssExtractPlugin.loader, "css-loader", "stylus-loader" ],
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
              },
              {
                  test: /\.js$/,
                  // 排除 node_modules中的js文件（不处理）
                  exclude: /(node_modules)/,
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          ]
      },
      // 插件
      plugins: [
          new ESLintPlugin({
              // context 检测哪些文件
              context: path.resolve(__dirname, "../src"),
          }),
          new HtmlWebpackPlugin({
              // 模板：以public/index.html文件创建新的html文件
              // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
              template: path.resolve(__dirname, "../public/index.html"),
          }),
          new BundleAnalyzerPlugin({
              analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
              generateStatsFile: true, // 是否生成stats.json文件
          }),
          new MiniCssExtractPlugin({
              filename: "static/css/main.css"
          })
      ],
      // 模式
      mode: 'production'
  }
  ```



##### 3. 运行指令

```
npm run build
```



### Css 兼容性处理

#### 1. 下载包

```
npm i postcss-loader postcss postcss-preset-env -D
```



#### 2. 配置

- webpack.prod.js

  ```javascript
  const path = require("path");
  const ESLintPlugin = require('eslint-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  
  module.exports = {
      // 入口
      entry: './src/main.js',
      // 输出
      output: {
          // 文件的输出路径，这里的路径要求绝对路径
          // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
          path: path.resolve(__dirname, "../dist"),
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
                      // 提取css成单独的文件
                      MiniCssExtractPlugin.loader,
                      // 将 css 资源编译成 commonjs 的模块到 js 中
                      "css-loader",
                      {
                          loader: "postcss-loader",
                          options: {
                              postcssOptions: {
                                  plugins: [
                                      "postcss-preset-env",   // 能解决大多数样式兼容性问题
                                  ],
                              },
                          },
                      },
                  ],
              },
              {
                  test: /\.less$/,
                  // 从右到左
                  // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                  use: [
                      MiniCssExtractPlugin.loader,
                      "css-loader",
                      {
                          loader: "postcss-loader",
                          options: {
                              postcssOptions: {
                                  plugins: [
                                      "postcss-preset-env",   // 能解决大多数样式兼容性问题
                                  ],
                              },
                          },
                      },
                  "less-loader" ],
              },
              {
                  test: /\.s[ac]ss$/,
                  use: [
                      MiniCssExtractPlugin.loader,
                      "css-loader",
                      {
                          loader: "postcss-loader",
                          options: {
                              postcssOptions: {
                                  plugins: [
                                      "postcss-preset-env",   // 能解决大多数样式兼容性问题
                                  ],
                              },
                          },
                      },
                      "sass-loader"
                  ],
              },
              {
                  test: /\.styl$/,
                  use: [
                      MiniCssExtractPlugin.loader,
                      "css-loader",
                      {
                          loader: "postcss-loader",
                          options: {
                              postcssOptions: {
                                  plugins: [
                                      "postcss-preset-env",   // 能解决大多数样式兼容性问题
                                  ],
                              },
                          },
                      },
                      "stylus-loader"
                  ],
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
              },
              {
                  test: /\.js$/,
                  // 排除 node_modules中的js文件（不处理）
                  exclude: /(node_modules)/,
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          ]
      },
      // 插件
      plugins: [
          new ESLintPlugin({
              // context 检测哪些文件
              context: path.resolve(__dirname, "../src"),
          }),
          new HtmlWebpackPlugin({
              // 模板：以public/index.html文件创建新的html文件
              // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
              template: path.resolve(__dirname, "../public/index.html"),
          }),
          new BundleAnalyzerPlugin({
              analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
              generateStatsFile: true, // 是否生成stats.json文件
          }),
          new MiniCssExtractPlugin({
              filename: "static/css/main.css"
          })
      ],
      // 模式
      mode: 'production'
  }
  ```



#### 3. 控制兼容性

我们可以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性做到什么程度

```json
{
    // 其他省略
    "browserslist": ["ie >= 8"]
}
```

以上为了测试兼容性所以设置兼容浏览器 ie8 以上

实际开发中我们一般不考虑旧版本浏览器了，所以我们可以这样设置：

```json
{
    // 其他省略
    "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```



#### 4. 合并配置

- webpack.prod.js

  ```javascript
  const path = require("path");
  const ESLintPlugin = require('eslint-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  
  // 用来获取处理样式的loader
  function getStyleLoader(pre){
      return [
          // 提取css成单独的文件
          MiniCssExtractPlugin.loader,
          // 将 css 资源编译成 commonjs 的模块到 js 中
          "css-loader",
          {
              loader: "postcss-loader",
              options: {
                  postcssOptions: {
                      plugins: [
                          "postcss-preset-env",   // 能解决大多数样式兼容性问题
                      ],
                  },
              },
          },
          pre,
      ].filter(Boolean)
  }
  
  module.exports = {
      // 入口
      entry: './src/main.js',
      // 输出
      output: {
          // 文件的输出路径，这里的路径要求绝对路径
          // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
          path: path.resolve(__dirname, "../dist"),
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
                  use: getStyleLoader()
              },
              {
                  test: /\.less$/,
                  // 从右到左
                  // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                  use: getStyleLoader('less-loader'),
              },
              {
                  test: /\.s[ac]ss$/,
                  use: getStyleLoader('sass-loader'),
              },
              {
                  test: /\.styl$/,
                  use: getStyleLoader('stylus-loader')
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
              },
              {
                  test: /\.js$/,
                  // 排除 node_modules中的js文件（不处理）
                  exclude: /(node_modules)/,
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          ]
      },
      // 插件
      plugins: [
          new ESLintPlugin({
              // context 检测哪些文件
              context: path.resolve(__dirname, "../src"),
          }),
          new HtmlWebpackPlugin({
              // 模板：以public/index.html文件创建新的html文件
              // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
              template: path.resolve(__dirname, "../public/index.html"),
          }),
          new BundleAnalyzerPlugin({
              analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
              generateStatsFile: true, // 是否生成stats.json文件
          }),
          new MiniCssExtractPlugin({
              filename: "static/css/main.css"
          })
      ],
      // 模式
      mode: 'production'
  }
  ```



#### 5. 运行指令

```
npm run build
```



### Css 压缩

#### 1. 下载包

```
npm i css-minimizer-webpack-plugin -D
```



#### 2. 配置

- webpack.prod.js

  ```javascript
  const path = require("path");
  const ESLintPlugin = require('eslint-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  
  // 用来获取处理样式的loader
  function getStyleLoader(pre){
      return [
          // 提取css成单独的文件
          MiniCssExtractPlugin.loader,
          // 将 css 资源编译成 commonjs 的模块到 js 中
          "css-loader",
          {
              loader: "postcss-loader",
              options: {
                  postcssOptions: {
                      plugins: [
                          "postcss-preset-env",   // 能解决大多数样式兼容性问题
                      ],
                  },
              },
          },
          pre,
      ].filter(Boolean)
  }
  
  module.exports = {
      // 入口
      entry: './src/main.js',
      // 输出
      output: {
          // 文件的输出路径，这里的路径要求绝对路径
          // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
          path: path.resolve(__dirname, "../dist"),
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
                  use: getStyleLoader()
              },
              {
                  test: /\.less$/,
                  // 从右到左
                  // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                  use: getStyleLoader('less-loader'),
              },
              {
                  test: /\.s[ac]ss$/,
                  use: getStyleLoader('sass-loader'),
              },
              {
                  test: /\.styl$/,
                  use: getStyleLoader('stylus-loader')
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
              },
              {
                  test: /\.js$/,
                  // 排除 node_modules中的js文件（不处理）
                  exclude: /(node_modules)/,
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          ]
      },
      // 插件
      plugins: [
          new ESLintPlugin({
              // context 检测哪些文件
              context: path.resolve(__dirname, "../src"),
          }),
          new HtmlWebpackPlugin({
              // 模板：以public/index.html文件创建新的html文件
              // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
              template: path.resolve(__dirname, "../public/index.html"),
          }),
          new BundleAnalyzerPlugin({
              analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
              generateStatsFile: true, // 是否生成stats.json文件
          }),
          new MiniCssExtractPlugin({
              filename: "static/css/main.css"
          }),
          new CssMinimizerPlugin()
      ],
      // 模式
      mode: 'production'
  }
  ```



#### 3. 运行指令

```
npm run build
```



### html 压缩

默认生产模式已经开启了 html 压缩 和 js 压缩

不需要额外进行配置



### 基础篇总结

本章节我们学会了 Webpack 基本使用，掌握了以下功能：

1. 两种开发模式
   - 开发模式：代码能编译自动化运行
   - 生产模式：代码编译优化输出
2. Webpack 基本功能
   - 开发模式：可以编译 ES Module 语法
   - 生产模式：可以编译 ES Module 语法，压缩 js 代码
3. Webpack 配置文件
   - 5 个核心概念
     - entry
     - output
     - loader
     - plugins
     - mode
   - devServer 配置
4. Webpack 脚本指令用法
   - `webpack` 直接打包输出
   - `webpack serve` 启动开发服务器，内存编译打包没有输出



## 高级优化

### 介绍

所谓高级配置其实就是进行 Webpack 优化，让我们代码在编译/运行时性能更好~

我们会从以下角度来进行优化：

1. 提升开发体验
2. 提升打包构建速度
3. 减少代码体积
4. 优化代码运行性能



### 提升开发体验

#### SourceMap

##### 为什么

开发时我们运行的代码是经过 webpack 编译后的，例如下面这个样子：

```javascript
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/less/index.less ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".box2 {\\n  width: 100px;\\n  height: 100px;\\n  background-color: deeppink;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://webpack5/./src/less/index.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),
// 其他省略
```

所有 css 和 js 合并成了一个文件，并且多了其他代码。此时如果代码运行出错那么提示代码错误位置我们是看不懂的。一旦将来开发代码文件很多，那么很难去发现错误出现在哪里。

所以我们需要更加准确的错误提示，来帮助我们更好的开发代码



##### 是什么

SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案

它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源



##### 怎么用

通过查看[Webpack DevTool 文档](https://webpack.docschina.org/configuration/devtool/)可知，SourceMap 的值有很多种情况.

但实际开发时我们只需要关注两种情况即可：

- 开发模式：`cheap-module-source-map`

  - 优点：打包编译速度快，只包含行映射
  - 缺点：没有列映射

  ```
  module.exports = {
    // 其他省略
    mode: "development",
    devtool: "cheap-module-source-map",
  };
  ```

- 生产模式：`source-map`

  - 优点：包含行/列映射
  - 缺点：打包编译速度更慢

  ```
  module.exports = {
    // 其他省略
    mode: "production",
    devtool: "source-map",
  };
  ```



### 提升打包构建速度

#### HotModuleReplacement

##### 为什么

开发时我们修改了其中一个模块代码，Webpack 默认会将所有模块全部重新打包编译，速度很慢

所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能很快



##### 是什么

HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、添加或删除模块，而无需重新加载整个页面



##### 怎么用

1.  基本配置

   ```javascript
   module.exports = {
     // 其他省略
     devServer: {
       host: "localhost", // 启动服务器域名
       port: "3000", // 启动服务器端口号
       open: true, // 是否自动打开浏览器
       hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
     },
   };
   ```

   此时 css 样式经过 style-loader 处理，已经具备 HMR 功能了。 但是 js 还不行

   

2.  JS 配置

   ```javascript
   // main.js
   import count from "./js/count";
   import sum from "./js/sum";
   // 引入资源，Webpack才会对其打包
   import "./css/iconfont.css";
   import "./css/index.css";
   import "./less/index.less";
   import "./sass/index.sass";
   import "./sass/index.scss";
   import "./styl/index.styl";
   
   const result1 = count(2, 1);
   console.log(result1);
   const result2 = sum(1, 2, 3, 4);
   console.log(result2);
   
   // 判断是否支持HMR功能
   if (module.hot) {
     module.hot.accept("./js/count.js", function (count) {
       const result1 = count(2, 1);
       console.log(result1);
     });
   
     module.hot.accept("./js/sum.js", function (sum) {
       const result2 = sum(1, 2, 3, 4);
       console.log(result2);
     });
   }
   ```

   上面这样写会很麻烦，所以实际开发我们会使用其他 loader 来解决

   比如：[vue-loader](https://github.com/vuejs/vue-loader), [react-hot-loader](https://github.com/gaearon/react-hot-loader)



#### One of

##### 为什么

打包时每个文件都会经过所有 loader 处理，虽然因为 `test` 正则原因实际没有处理上，但是都要过一遍。比较慢



##### 是什么

顾名思义就是只能匹配上一个 loader, 剩下的就不匹配了



##### 怎么用

```javascript
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 开发模式没输出，所以不需要指定输出路径
        path: undefined,
        // 入口文件打包的输出名称
        filename: 'static/js/main.js',
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                oneOf: [
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
                    },
                    {
                        test: /\.js$/,
                        // 排除 node_modules中的js文件（不处理）
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "../src"),
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        }),
    ],
    // 开发服务器: 不会输出资源 在内存中编译打包的
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR
    },
    // 模式
    mode: 'development',
    devtool: "cheap-module-source-map"
}
```

生产模式也是如此



#### Include / Exclude

##### 为什么

开发时我们需要使用第三方的库或插件，所有文件都下载到 node_modules 中了。而这些文件是不需要编译可以直接使用的



##### 是什么

- include

包含，只处理 xxx 文件

- exclude

排除，除了 xxx 文件以外其他文件都处理



##### 怎么用

```javascript
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 开发模式没输出，所以不需要指定输出路径
        path: undefined,
        // 入口文件打包的输出名称
        filename: 'static/js/main.js',
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                oneOf: [
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
                    },
                    {
                        test: /\.js$/,
                        // 排除 node_modules中的js文件（不处理）
                        // exclude: /(node_modules)/,   // 排除node_modules下的文件，其他文件都处理
                        include: path.resolve(__dirname, '../src'),     // 只处理src下的文件
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        }),
    ],
    // 开发服务器: 不会输出资源 在内存中编译打包的
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot: true, // 开启HMR
    },
    // 模式
    mode: 'development',
    devtool: "cheap-module-source-map"
}
```

生产模式也是如此配置



#### Cache

##### 为什么

每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了



##### 是什么

对 Eslint 检查 和 Babel 编译结果进行缓存



##### 怎么用

```javascript
const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 用来获取处理样式的loader
function getStyleLoader(pre){
    return [
        // 提取css成单独的文件
        MiniCssExtractPlugin.loader,
        // 将 css 资源编译成 commonjs 的模块到 js 中
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",   // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre,
    ].filter(Boolean)
}

module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        // 文件的输出路径，这里的路径要求绝对路径
        // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"),
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
                oneOf: [
                    {
                        // 只检测.css文件
                        test: /\.css$/,
                        // 执行顺序，从右到左（从下到上）
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        // 从右到左
                        // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                        use: getStyleLoader('less-loader'),
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader('sass-loader'),
                    },
                    {
                        test: /\.styl$/,
                        use: getStyleLoader('stylus-loader')
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
                    },
                    {
                        test: /\.js$/,
                        // 排除 node_modules中的js文件（不处理）
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        options: {
                            // presets: ['@babel/preset-env']
                            cacheDirectory: true,   // 开启babel缓存
                            cacheCompression: false, // 关闭缓存文件压缩
                        }
                    }
                ]
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // context 检测哪些文件
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache')
        }),
        new HtmlWebpackPlugin({
            // 模板：以public/index.html文件创建新的html文件
            // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
            generateStatsFile: true, // 是否生成stats.json文件
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
        new CssMinimizerPlugin()
    ],
    // 模式
    mode: 'production',
    devtool: "source-map"
}
```



#### Tread

##### 为什么

当项目越来越庞大时，打包速度越来越慢，甚至于需要一个下午才能打包出来代码。这个速度是比较慢的

我们想要继续提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少

而对 js 文件处理主要就是 eslint 、babel、Terser 三个工具，所以我们要提升它们的运行速度

我们可以开启多进程同时处理 js 文件，这样速度就比之前的单进程打包更快了



##### 是什么

多进程打包：开启电脑的多个进程同时干一件事，速度更快

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销**



##### 怎么用

我们启动进程的数量就是我们 CPU 的核数

1.  如何获取 CPU 的核数，因为每个电脑都不一样

   ```javascript
   // nodejs核心模块，直接使用
   const os = require("os");
   // cpu核数
   const threads = os.cpus().length;
   ```

2.  下载包

   ```
   npm i thread-loader -D
   ```

3. 使用

   ```javascript
   const os = require("os");
   const path = require("path");
   const ESLintPlugin = require('eslint-webpack-plugin');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
   
   const TerserWebpackPlugin = require("terser-webpack-plugin");
   const threads = os.cpus().length;   // cpu核数
   
   module.exports = {
       // 入口
       entry: './src/main.js',
       // 输出
       output: {
           // 开发模式没输出，所以不需要指定输出路径
           path: undefined,
           // 入口文件打包的输出名称
           filename: 'static/js/main.js',
       },
       // 加载器
       module: {
           rules: [
               // loader的配置
               {
                   oneOf: [
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
                       },
                       {
                           test: /\.js$/,
                           // 排除 node_modules中的js文件（不处理）
                           exclude: /(node_modules)/,
                           use: [
                               {
                                   loader: 'thread-loader',    // 开启多进程
                                   options: {
                                       works: threads,
                                   }
                               },
                               {
                                   loader: 'babel-loader',
                                   options: {
                                       // presets: ['@babel/preset-env']
                                       cacheDirectory: true,   // 开启babel缓存
                                       cacheCompression: false, // 关闭缓存文件压缩
                                   }
                               }
                           ]
                       }
                   ]
               }
           ]
       },
       // 插件
       plugins: [
           new ESLintPlugin({
               // context 检测哪些文件
               context: path.resolve(__dirname, "../src"),
               exclude: "node_modules",
               cache: true,
               cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
               threads,
           }),
           new HtmlWebpackPlugin({
               // 模板：以public/index.html文件创建新的html文件
               // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
               template: path.resolve(__dirname, "../public/index.html"),
           }),
           new BundleAnalyzerPlugin({
               analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
               generateStatsFile: true, // 是否生成stats.json文件
           }),
       ],
       optimization: {
           // 压缩的操作
           minimizer: [
               // 压缩css
               new CssMinimizerPlugin(),
               // 压缩js
               new TerserWebpackPlugin({
                   parallel: threads, // 开启多进程和设置进程数量
               })
           ]
       },
       // 开发服务器: 不会输出资源 在内存中编译打包的
       devServer: {
           host: "localhost", // 启动服务器域名
           port: "3000", // 启动服务器端口号
           open: true, // 是否自动打开浏览器
           hot: true, // 开启HMR
       },
       // 模式
       mode: 'development',
       devtool: "cheap-module-source-map"
   }
   ```

   我们目前打包的内容都很少，所以因为启动进程开销原因，使用多进程打包实际上会显著的让我们打包时间变得很长



### 减少代码体积

#### Tree Shaking

##### 为什么

开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库

如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能

这样将整个库都打包进来，体积就太大了



##### 是什么

`Tree Shaking` 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码

**注意：它依赖 `ES Module`**



##### 怎么用

Webpack 已经默认开启了这个功能，无需其他配置



#### Babel

##### 为什么

Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

Babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend` 默认情况下会被添加到每一个需要它的文件中

可以将这些辅助代码作为一个独立模块，来避免重复引入



##### 是什么

`@babel/plugin-transform-runtime`：

禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用



##### 怎么用

1.  下载包

   ```
   npm i @babel/plugin-transform-runtime -D
   ```

2.  配置

   ```javascript
   const os = require("os");
   const path = require("path");
   const ESLintPlugin = require('eslint-webpack-plugin');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
   
   const TerserWebpackPlugin = require("terser-webpack-plugin");
   const threads = os.cpus().length;   // cpu核数
   
   // 用来获取处理样式的loader
   function getStyleLoader(pre){
       return [
           // 提取css成单独的文件
           MiniCssExtractPlugin.loader,
           // 将 css 资源编译成 commonjs 的模块到 js 中
           "css-loader",
           {
               loader: "postcss-loader",
               options: {
                   postcssOptions: {
                       plugins: [
                           "postcss-preset-env",   // 能解决大多数样式兼容性问题
                       ],
                   },
               },
           },
           pre,
       ].filter(Boolean)
   }
   
   module.exports = {
       // 入口
       entry: './src/main.js',
       // 输出
       output: {
           // 文件的输出路径，这里的路径要求绝对路径
           // __dirname 是 nodejs 的变量，代表当前文件的文件夹目录
           path: path.resolve(__dirname, "../dist"),
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
                   oneOf: [
                       {
                           // 只检测.css文件
                           test: /\.css$/,
                           // 执行顺序，从右到左（从下到上）
                           use: getStyleLoader()
                       },
                       {
                           test: /\.less$/,
                           // 从右到左
                           // loader: 'xxx'    loader是只能使用一个，use是可以使用多个
                           use: getStyleLoader('less-loader'),
                       },
                       {
                           test: /\.s[ac]ss$/,
                           use: getStyleLoader('sass-loader'),
                       },
                       {
                           test: /\.styl$/,
                           use: getStyleLoader('stylus-loader')
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
                       },
                       {
                           test: /\.js$/,
                           // 排除 node_modules中的js文件（不处理）
                           exclude: /(node_modules)/,
                           use: [
                               {
                                   loader: 'thread-loader',    // 开启多进程
                                   options: {
                                       works: threads,
                                   }
                               },
                               {
                                   loader: 'babel-loader',
                                   options: {
                                       // presets: ['@babel/preset-env']
                                       cacheDirectory: true,   // 开启babel缓存
                                       cacheCompression: false,    // 关闭缓存文件压缩
                                       plugins: ["@babel/plugin-transform-runtime"],   // 减少代码体积
                                   }
                               }
                           ]
                       }
                   ]
               }
           ]
       },
       // 插件
       plugins: [
           new ESLintPlugin({
               // context 检测哪些文件
               context: path.resolve(__dirname, "../src"),
               exclude: "node_modules",
               cache: true,
               cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
               threads,
           }),
           new HtmlWebpackPlugin({
               // 模板：以public/index.html文件创建新的html文件
               // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
               template: path.resolve(__dirname, "../public/index.html"),
           }),
           new BundleAnalyzerPlugin({
               analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
               generateStatsFile: true, // 是否生成stats.json文件
           }),
           new MiniCssExtractPlugin({
               filename: "static/css/main.css"
           }),
       ],
       optimization: {
           // 压缩的操作
           minimizer: [
               // 压缩css
               new CssMinimizerPlugin(),
               // 压缩js
               new TerserWebpackPlugin({
                   parallel: threads, // 开启多进程和设置进程数量
               })
           ]
       },
       // 模式
       mode: 'production',
       devtool: "source-map"
   }
   ```

   

#### Image Minimizer

##### 为什么

开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢

我们可以对图片进行压缩，减少图片体积

**注意：如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩**



##### 是什么

`image-minimizer-webpack-plugin`: 用来压缩图片的插件



##### 怎么用

1.  下载包

   ```
   npm i image-minimizer-webpack-plugin imagemin -D
   ```

   还有剩下包需要下载，有两种模式：

   - 无损压缩

     ```
     npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
     ```

   - 有损压缩

     ```
     npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
     ```

2.  配置

   以无损压缩配置为例：

   ```javascript
   const os = require("os");
   const path = require("path");
const ESLintPlugin = require('eslint-webpack-plugin');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
   const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
   const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
   
   const TerserWebpackPlugin = require("terser-webpack-plugin");
   const threads = os.cpus().length;   // cpu核数
   
   module.exports = {
       // 入口
       entry: './src/main.js',
       // 输出
       output: {
           // 开发模式没输出，所以不需要指定输出路径
           path: undefined,
           // 入口文件打包的输出名称
           filename: 'static/js/main.js',
       },
       // 加载器
       module: {
           rules: [
               // loader的配置
               {
                   oneOf: [
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
                       },
                       {
                           test: /\.js$/,
                           // 排除 node_modules中的js文件（不处理）
                           exclude: /(node_modules)/,
                           use: [
                               {
                                   loader: 'thread-loader',    // 开启多进程
                                   options: {
                                       works: threads,
                                   }
                               },
                               {
                                   loader: 'babel-loader',
                                   options: {
                                       // presets: ['@babel/preset-env']
                                       cacheDirectory: true,   // 开启babel缓存
                                       cacheCompression: false, // 关闭缓存文件压缩
                                       plugins: ["@babel/plugin-transform-runtime"],   // 减少代码体积
                                   }
                               }
                           ]
                       }
                   ]
               }
           ]
       },
       // 插件
       plugins: [
           new ESLintPlugin({
               // context 检测哪些文件
               context: path.resolve(__dirname, "../src"),
               exclude: "node_modules",
               cache: true,
               cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
               threads,
           }),
           new HtmlWebpackPlugin({
               // 模板：以public/index.html文件创建新的html文件
               // 新的html文件的特点：1.结构和原来一致 2.自动引入打包输出的资源
               template: path.resolve(__dirname, "../public/index.html"),
           }),
           new BundleAnalyzerPlugin({
               analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
               generateStatsFile: true, // 是否生成stats.json文件
           }),
       ],
       optimization: {
           // 压缩的操作
           minimizer: [
               // 压缩css
               new CssMinimizerPlugin(),
               // 压缩js
               new TerserWebpackPlugin({
                   parallel: threads, // 开启多进程和设置进程数量
               }),
               // 压缩图片
               new ImageMinimizerPlugin({
                   minimizer: {
                   implementation: ImageMinimizerPlugin.imageminGenerate,
                   options: {
                       plugins: [
                       ["gifsicle", { interlaced: true }],
                       ["jpegtran", { progressive: true }],
                       ["optipng", { optimizationLevel: 5 }],
                       [
                           "svgo",
                           {
                           plugins: [
                               "preset-default",
                               "prefixIds",
                               {
                               name: "sortAttrs",
                               params: {
                                   xmlnsOrder: "alphabetical",
                               },
                               },
                           ],
                           },
                       ],
                       ],
                   },
                   },
               }),
           ]
       },
       // 开发服务器: 不会输出资源 在内存中编译打包的
       devServer: {
           host: "localhost", // 启动服务器域名
           port: "3000", // 启动服务器端口号
           open: true, // 是否自动打开浏览器
           hot: true, // 开启HMR
       },
       // 模式
       mode: 'development',
       devtool: "cheap-module-source-map"
   }
   ```
   
3.   打包时会出现报错

    ```
    Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
    Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
    ```

    我们需要安装两个文件到 node_modules 中才能解决, 文件可以从课件中找到：

    - jpegtran.exe

    需要复制到 `node_modules\jpegtran-bin\vendor` 下面

    [jpegtran 官网地址](http://jpegclub.org/jpegtran/)

    - optipng.exe

    需要复制到 `node_modules\optipng-bin\vendor` 下面

    [OptiPNG 官网地址](http://optipng.sourceforge.net/)



### 优化代码运行性能

#### Code Split

##### 为什么

打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载

所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快



##### 是什么

代码分割（Code Split）主要做了两件事：

1. 分割文件：将打包生成的文件进行分割，生成多个 js 文件
2. 按需加载：需要哪个文件就加载哪个文件



##### 怎么用

1.  多入口

   1.  文件目录

      ```
      ├── public
      ├── src
      |   ├── app.js
      |   └── main.js
      ├── package.json
      └── webpack.config.js
      ```

   2.  下载包

      ```
      npm i webpack webpack-cli html-webpack-plugin -D
      ```

   3.  新建文件

      内容无关紧要，主要观察打包输出的结果

      - app.js

        ```javascript
        console.log("hello app");
        ```

      - main.js

        ```javascript
        console.log("hello main");
        ```

   4.  配置

      ```javascript
      // webpack.config.js
      const path = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
      
      module.exports = {
        // 单入口
        // entry: './src/main.js',
        // 多入口
        entry: {
          main: "./src/main.js",
          app: "./src/app.js",
        },
        output: {
          path: path.resolve(__dirname, "./dist"),
          // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
          // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
          // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
          // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
          filename: "js/[name].js",
          clear: true,
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: "./public/index.html",
          }),
        ],
        mode: "production",
      };
      ```

   5.  运行指令

      ```
      npx webpack
      ```

      此时在 dist 目录我们能看到输出了两个 js 文件

      总结：配置了几个入口，至少输出几个 js 文件

      

2.  提取重复代码

   如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大

   我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好

   1.  修改文件

      - app.js

        ```javascript
        import { sum } from "./math";
        
        console.log("hello app");
        console.log(sum(1, 2, 3, 4));
        ```

      - main.js

        ```javascript
        import { sum } from "./math";
        
        console.log("hello main");
        console.log(sum(1, 2, 3, 4, 5));
        ```

      - math.js

        ```javascript
        export function sum(...args){
            return args.reduce((p, c) => p + c, 0);
        }
        ```

   2.  修改配置文件

      ```javascript
      // webpack.config.js
      const path = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
      
      module.exports = {
        // 单入口
        // entry: './src/main.js',
        // 多入口
        entry: {
          main: "./src/main.js",
          app: "./src/app.js",
        },
        output: {
          path: path.resolve(__dirname, "./dist"),
          // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
          // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
          // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
          // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
          filename: "js/[name].js",
          clean: true,
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: "./public/index.html",
          }),
        ],
        mode: "production",
        optimization: {
          // 代码分割配置
          splitChunks: {
            chunks: "all", // 对所有模块都进行分割
            // 以下是默认值
            // minSize: 20000, // 分割代码最小的大小
            // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
            // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
            // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
            // maxInitialRequests: 30, // 入口js文件最大并行请求数量
            // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
            // cacheGroups: { // 组，哪些模块要打包到一个组
            //   defaultVendors: { // 组名
            //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
            //     priority: -10, // 权重（越大越高）
            //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            //   },
            //   default: { // 其他没有写的配置会使用上面的默认值
            //     minChunks: 2, // 这里的minChunks权重更大
            //     priority: -20,
            //     reuseExistingChunk: true,
            //   },
            // },
            // 修改配置
            cacheGroups: {
              // 组，哪些模块要打包到一个组
              // defaultVendors: { // 组名
              //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
              //   priority: -10, // 权重（越大越高）
              //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
              // },
              default: {
                // 其他没有写的配置会使用上面的默认值
                minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          },
        },
      };
      ```

   3. 运行指令

      ```
      npx webpack
      ```

      此时我们会发现生成 3 个 js 文件，其中有一个就是提取的公共模块

      

3.  按需加载，动态导入

   想要实现按需加载，动态导入模块。还需要额外配置：

   1.  修改文件

      - main.js

        ```javascript
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
        ```
        
      - app.js
      
        ```javascript
        console.log("hello app");
        ```
      
      - public/index.html
      
        ```javascript
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>code Split</title>
        </head>
        <body>
            <h1>hello pack</h1>
            <button id="btn">count</button>
        </body>
        </html>
        ```
      
   2.   运行指令
   
       ```
       npx webpack
       ```
   
       我们可以发现，一旦通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了
   
       
   
4.   单入口

    开发时我们可能是单页面应用（SPA），只有一个入口（单入口）。那么我们需要这样配置：

    ```
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    
    module.exports = {
      // 单入口
      entry: "./src/main.js",
      // 多入口
      // entry: {
      //   main: "./src/main.js",
      //   app: "./src/app.js",
      // },
      output: {
        path: path.resolve(__dirname, "./dist"),
        // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
        // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
        // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
        // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
        filename: "js/[name].js",
        clean: true,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
      ],
      mode: "production",
      optimization: {
        // 代码分割配置
        splitChunks: {
          chunks: "all", // 对所有模块都进行分割
          // 以下是默认值
          // minSize: 20000, // 分割代码最小的大小
          // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
          // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
          // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
          // maxInitialRequests: 30, // 入口js文件最大并行请求数量
          // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
          // cacheGroups: { // 组，哪些模块要打包到一个组
          //   defaultVendors: { // 组名
          //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          //     priority: -10, // 权重（越大越高）
          //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          //   },
          //   default: { // 其他没有写的配置会使用上面的默认值
          //     minChunks: 2, // 这里的minChunks权重更大
          //     priority: -20,
          //     reuseExistingChunk: true,
          //   },
          // },
      },
    };
    ```

    

5.   更新配置

    最终我们会使用单入口+代码分割+动态导入方式来进行配置。更新之前的配置文件。

    ```javascript
    // webpack.prod.js
    const os = require("os");
    const path = require("path");
    const ESLintWebpackPlugin = require("eslint-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    const TerserPlugin = require("terser-webpack-plugin");
    const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
    
    // cpu核数
    const threads = os.cpus().length;
    
    // 获取处理样式的Loaders
    const getStyleLoaders = (preProcessor) => {
      return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                "postcss-preset-env", // 能解决大多数样式兼容性问题
              ],
            },
          },
        },
        preProcessor,
      ].filter(Boolean);
    };
    
    module.exports = {
      entry: "./src/main.js",
      output: {
        path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
        filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
        clean: true,
      },
      module: {
        rules: [
          {
            oneOf: [
              {
                // 用来匹配 .css 结尾的文件
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: getStyleLoaders(),
              },
              {
                test: /\.less$/,
                use: getStyleLoaders("less-loader"),
              },
              {
                test: /\.s[ac]ss$/,
                use: getStyleLoaders("sass-loader"),
              },
              {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader"),
              },
              {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                  },
                },
                generator: {
                  // 将图片文件输出到 static/imgs 目录中
                  // 将图片文件命名 [hash:8][ext][query]
                  // [hash:8]: hash值取8位
                  // [ext]: 使用之前的文件扩展名
                  // [query]: 添加之前的query参数
                  filename: "static/imgs/[hash:8][ext][query]",
                },
              },
              {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                  filename: "static/media/[hash:8][ext][query]",
                },
              },
              {
                test: /\.js$/,
                // exclude: /node_modules/, // 排除node_modules代码不编译
                include: path.resolve(__dirname, "../src"), // 也可以用包含
                use: [
                  {
                    loader: "thread-loader", // 开启多进程
                    options: {
                      workers: threads, // 数量
                    },
                  },
                  {
                    loader: "babel-loader",
                    options: {
                      cacheDirectory: true, // 开启babel编译缓存
                      cacheCompression: false, // 缓存文件不要压缩
                      plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      plugins: [
        new ESLintWebpackPlugin({
          // 指定检查文件的根目录
          context: path.resolve(__dirname, "../src"),
          exclude: "node_modules", // 默认值
          cache: true, // 开启缓存
          // 缓存目录
          cacheLocation: path.resolve(
            __dirname,
            "../node_modules/.cache/.eslintcache"
          ),
          threads, // 开启多进程
        }),
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
          template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
          // 定义输出文件名和目录
          filename: "static/css/main.css",
        }),
        // css压缩
        // new CssMinimizerPlugin(),
      ],
      optimization: {
        minimizer: [
          // css压缩也可以写到optimization.minimizer里面，效果一样的
          new CssMinimizerPlugin(),
          // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
          new TerserPlugin({
            parallel: threads, // 开启多进程
          }),
          // 压缩图片
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: [
                  ["gifsicle", { interlaced: true }],
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                  [
                    "svgo",
                    {
                      plugins: [
                        "preset-default",
                        "prefixIds",
                        {
                          name: "sortAttrs",
                          params: {
                            xmlnsOrder: "alphabetical",
                          },
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          }),
        ],
        // 代码分割配置
        splitChunks: {
          chunks: "all", // 对所有模块都进行分割
          // 其他内容用默认配置即可
        },
      },
      // devServer: {
      //   host: "localhost", // 启动服务器域名
      //   port: "3000", // 启动服务器端口号
      //   open: true, // 是否自动打开浏览器
      // },
      mode: "production",
      devtool: "source-map",
    };
    ```

    

6.   给动态导入文件取名称

    1.   修改文件

        - main.js

          ```javascript
          import sum from "./js/sum";
          // 引入资源，Webpack才会对其打包
          import "./css/iconfont.css";
          import "./css/index.css";
          import "./less/index.less";
          import "./sass/index.sass";
          import "./sass/index.scss";
          import "./styl/index.styl";
          
          const result2 = sum(1, 2, 3, 4);
          console.log(result2);
          
          // 以下代码生产模式下会删除
          if (module.hot) {
            module.hot.accept("./js/sum.js", function (sum) {
              const result2 = sum(1, 2, 3, 4);
              console.log(result2);
            });
          }
          
          document.getElementById("btn").onClick = function () {
            // eslint会对动态导入语法报错，需要修改eslint配置文件
            // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
            // "math"将来就会作为[name]的值显示。
            import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
              console.log(count(2, 1));
            });
          };
          ```

    2.   eslint配置

        - 下载包

          ```
          npm i eslint-plugin-import -D
          ```

        - 配置

          ```javascript
          // .eslintrc.js
          module.exports = {
            // 继承 Eslint 规则
            extends: ["eslint:recommended"],
            env: {
              node: true, // 启用node中全局变量
              browser: true, // 启用浏览器中全局变量
            },
            plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
            parserOptions: {
              ecmaVersion: 6,
              sourceType: "module",
            },
            rules: {
              "no-var": 2, // 不能使用 var 定义变量
            },
          };
          ```

    3.   统一命名配置

        ```javascript
        const os = require("os");
        const path = require("path");
        const ESLintWebpackPlugin = require("eslint-webpack-plugin");
        const HtmlWebpackPlugin = require("html-webpack-plugin");
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
        const TerserPlugin = require("terser-webpack-plugin");
        const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
        
        // cpu核数
        const threads = os.cpus().length;
        
        // 获取处理样式的Loaders
        const getStyleLoaders = (preProcessor) => {
          return [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    "postcss-preset-env", // 能解决大多数样式兼容性问题
                  ],
                },
              },
            },
            preProcessor,
          ].filter(Boolean);
        };
        
        module.exports = {
          entry: "./src/main.js",
          output: {
            path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
            filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
            chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
            assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
            clean: true,
          },
          module: {
            rules: [
              {
                oneOf: [
                  {
                    // 用来匹配 .css 结尾的文件
                    test: /\.css$/,
                    // use 数组里面 Loader 执行顺序是从右到左
                    use: getStyleLoaders(),
                  },
                  {
                    test: /\.less$/,
                    use: getStyleLoaders("less-loader"),
                  },
                  {
                    test: /\.s[ac]ss$/,
                    use: getStyleLoaders("sass-loader"),
                  },
                  {
                    test: /\.styl$/,
                    use: getStyleLoaders("stylus-loader"),
                  },
                  {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    type: "asset",
                    parser: {
                      dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                      },
                    },
                    // generator: {
                    //   // 将图片文件输出到 static/imgs 目录中
                    //   // 将图片文件命名 [hash:8][ext][query]
                    //   // [hash:8]: hash值取8位
                    //   // [ext]: 使用之前的文件扩展名
                    //   // [query]: 添加之前的query参数
                    //   filename: "static/imgs/[hash:8][ext][query]",
                    // },
                  },
                  {
                    test: /\.(ttf|woff2?)$/,
                    type: "asset/resource",
                    // generator: {
                    //   filename: "static/media/[hash:8][ext][query]",
                    // },
                  },
                  {
                    test: /\.js$/,
                    // exclude: /node_modules/, // 排除node_modules代码不编译
                    include: path.resolve(__dirname, "../src"), // 也可以用包含
                    use: [
                      {
                        loader: "thread-loader", // 开启多进程
                        options: {
                          workers: threads, // 数量
                        },
                      },
                      {
                        loader: "babel-loader",
                        options: {
                          cacheDirectory: true, // 开启babel编译缓存
                          cacheCompression: false, // 缓存文件不要压缩
                          plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          plugins: [
            new ESLintWebpackPlugin({
              // 指定检查文件的根目录
              context: path.resolve(__dirname, "../src"),
              exclude: "node_modules", // 默认值
              cache: true, // 开启缓存
              // 缓存目录
              cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
              ),
              threads, // 开启多进程
            }),
            new HtmlWebpackPlugin({
              // 以 public/index.html 为模板创建文件
              // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
              template: path.resolve(__dirname, "../public/index.html"),
            }),
            // 提取css成单独文件
            new MiniCssExtractPlugin({
              // 定义输出文件名和目录
              filename: "static/css/[name].css",
              chunkFilename: "static/css/[name].chunk.css",
            }),
            // css压缩
            // new CssMinimizerPlugin(),
          ],
          optimization: {
            minimizer: [
              // css压缩也可以写到optimization.minimizer里面，效果一样的
              new CssMinimizerPlugin(),
              // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
              new TerserPlugin({
                parallel: threads, // 开启多进程
              }),
              // 压缩图片
              new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      [
                        "svgo",
                        {
                          plugins: [
                            "preset-default",
                            "prefixIds",
                            {
                              name: "sortAttrs",
                              params: {
                                xmlnsOrder: "alphabetical",
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
              }),
            ],
            // 代码分割配置
            splitChunks: {
              chunks: "all", // 对所有模块都进行分割
              // 其他内容用默认配置即可
            },
          },
          // devServer: {
          //   host: "localhost", // 启动服务器域名
          //   port: "3000", // 启动服务器端口号
          //   open: true, // 是否自动打开浏览器
          // },
          mode: "production",
          devtool: "source-map",
        };
        ```

    4.   运行指令

        ```
        npx webpack
        ```



#### Preload / Prefetch

##### 为什么

我们前面已经做了代码分割，同时会使用 import 动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）

但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果

我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 `Preload` 或 `Prefetch` 技术



##### 是什么

- `preload`：告诉浏览器立即加载资源
- `prefetch`：告诉浏览器在空闲时才开始加载资源

它们共同点：

- 都只会加载资源，并不执行
- 都有缓存

它们区别：

- `preload` 加载优先级高，`prefetch` 加载优先级低
- `preload` 只能加载当前页面需要使用的资源，`prefetch` 可以加载当前页面资源，也可以加载下一个页面需要使用的资源

总结：

- 当前页面优先级高的资源使用 `preload` 加载
- 下一个页面需要使用的资源用 `prefetch` 加载

它们的问题：兼容性较差

- 我们可以去 Can I Use 网站查询 API 兼容性问题
- `preload` 相对于 `prefetch` 兼容性好一点



##### 怎么用

1. 下载包

   ```
   npm i @vue/preload-webpack-plugin -D
   ```

2.  配置 webpack.prod.js

   ```javascript
   const os = require("os");
   const path = require("path");
   const ESLintWebpackPlugin = require("eslint-webpack-plugin");
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
   const TerserPlugin = require("terser-webpack-plugin");
   const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
   const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
   
   // cpu核数
   const threads = os.cpus().length;
   
   // 获取处理样式的Loaders
   const getStyleLoaders = (preProcessor) => {
     return [
       MiniCssExtractPlugin.loader,
       "css-loader",
       {
         loader: "postcss-loader",
         options: {
           postcssOptions: {
             plugins: [
               "postcss-preset-env", // 能解决大多数样式兼容性问题
             ],
           },
         },
       },
       preProcessor,
     ].filter(Boolean);
   };
   
   module.exports = {
     entry: "./src/main.js",
     output: {
       path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
       filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
       chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
       assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
       clean: true,
     },
     module: {
       rules: [
         {
           oneOf: [
             {
               // 用来匹配 .css 结尾的文件
               test: /\.css$/,
               // use 数组里面 Loader 执行顺序是从右到左
               use: getStyleLoaders(),
             },
             {
               test: /\.less$/,
               use: getStyleLoaders("less-loader"),
             },
             {
               test: /\.s[ac]ss$/,
               use: getStyleLoaders("sass-loader"),
             },
             {
               test: /\.styl$/,
               use: getStyleLoaders("stylus-loader"),
             },
             {
               test: /\.(png|jpe?g|gif|svg)$/,
               type: "asset",
               parser: {
                 dataUrlCondition: {
                   maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                 },
               },
               // generator: {
               //   // 将图片文件输出到 static/imgs 目录中
               //   // 将图片文件命名 [hash:8][ext][query]
               //   // [hash:8]: hash值取8位
               //   // [ext]: 使用之前的文件扩展名
               //   // [query]: 添加之前的query参数
               //   filename: "static/imgs/[hash:8][ext][query]",
               // },
             },
             {
               test: /\.(ttf|woff2?)$/,
               type: "asset/resource",
               // generator: {
               //   filename: "static/media/[hash:8][ext][query]",
               // },
             },
             {
               test: /\.js$/,
               // exclude: /node_modules/, // 排除node_modules代码不编译
               include: path.resolve(__dirname, "../src"), // 也可以用包含
               use: [
                 {
                   loader: "thread-loader", // 开启多进程
                   options: {
                     workers: threads, // 数量
                   },
                 },
                 {
                   loader: "babel-loader",
                   options: {
                     cacheDirectory: true, // 开启babel编译缓存
                     cacheCompression: false, // 缓存文件不要压缩
                     plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                   },
                 },
               ],
             },
           ],
         },
       ],
     },
     plugins: [
       new ESLintWebpackPlugin({
         // 指定检查文件的根目录
         context: path.resolve(__dirname, "../src"),
         exclude: "node_modules", // 默认值
         cache: true, // 开启缓存
         // 缓存目录
         cacheLocation: path.resolve(
           __dirname,
           "../node_modules/.cache/.eslintcache"
         ),
         threads, // 开启多进程
       }),
       new HtmlWebpackPlugin({
         // 以 public/index.html 为模板创建文件
         // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
         template: path.resolve(__dirname, "../public/index.html"),
       }),
       // 提取css成单独文件
       new MiniCssExtractPlugin({
         // 定义输出文件名和目录
         filename: "static/css/[name].css",
         chunkFilename: "static/css/[name].chunk.css",
       }),
       // css压缩
       // new CssMinimizerPlugin(),
       new PreloadWebpackPlugin({
         rel: "preload", // preload兼容性更好
         as: "script",
         // rel: 'prefetch' // prefetch兼容性更差
       }),
     ],
     optimization: {
       minimizer: [
         // css压缩也可以写到optimization.minimizer里面，效果一样的
         new CssMinimizerPlugin(),
         // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
         new TerserPlugin({
           parallel: threads, // 开启多进程
         }),
         // 压缩图片
         new ImageMinimizerPlugin({
           minimizer: {
             implementation: ImageMinimizerPlugin.imageminGenerate,
             options: {
               plugins: [
                 ["gifsicle", { interlaced: true }],
                 ["jpegtran", { progressive: true }],
                 ["optipng", { optimizationLevel: 5 }],
                 [
                   "svgo",
                   {
                     plugins: [
                       "preset-default",
                       "prefixIds",
                       {
                         name: "sortAttrs",
                         params: {
                           xmlnsOrder: "alphabetical",
                         },
                       },
                     ],
                   },
                 ],
               ],
             },
           },
         }),
       ],
       // 代码分割配置
       splitChunks: {
         chunks: "all", // 对所有模块都进行分割
         // 其他内容用默认配置即可
       },
     },
     // devServer: {
     //   host: "localhost", // 启动服务器域名
     //   port: "3000", // 启动服务器端口号
     //   open: true, // 是否自动打开浏览器
     // },
     mode: "production",
     devtool: "source-map",
   };
   ```



#### Network Cache

##### 为什么

将来开发时我们对静态资源会使用缓存来优化，这样浏览器第二次请求资源就能读取缓存了，速度很快

但是这样的话就会有一个问题, 因为前后输出的文件名是一样的，都叫 main.js，一旦将来发布新版本，因为文件名没有变化导致浏览器会直接读取缓存，不会加载新资源，项目也就没法更新了

所以我们从文件名入手，确保更新前后文件名不一样，这样就可以做缓存了



##### 是什么

它们都会生成一个唯一的 hash 值

- fullhash（webpack4 是 hash）

每次修改任何一个文件，所有文件名的 hash 至都将改变。所以一旦修改了任何一个文件，整个项目的文件缓存都将失效

- chunkhash

根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。我们 js 和 css 是同一个引入，会共享一个 hash 值

- contenthash

根据文件内容生成 hash 值，只有文件内容变化了，hash 值才会变化。所有文件 hash 值是独享且不同的



##### 怎么用

```javascript
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/media/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};
```

- 问题：

  当我们修改 math.js 文件再重新打包的时候，因为 contenthash 原因，math.js 文件 hash 值发生了变化（这是正常的）。

  但是 main.js 文件的 hash 值也发生了变化，这会导致 main.js 的缓存失效。明明我们只修改 math.js, 为什么 main.js 也会变身变化呢？

- 原因：

  - 更新前：math.xxx.js, main.js 引用的 math.xxx.js
  - 更新后：math.yyy.js, main.js 引用的 math.yyy.js, 文件名发生了变化，间接导致 main.js 也发生了变化

- 解决：

  将 hash 值单独保管在一个 runtime 文件中

  我们最终输出三个文件：main、math、runtime。当 math 文件发送变化，变化的是 math 和 runtime 文件，main 不变

  runtime 文件只保存文件的 hash 值和它们与文件关系，整个文件体积就比较小，所以变化重新请求的代价也小

```javascript
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    // [contenthash:8]使用contenthash，取8位长度
    filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            // generator: {
            //   // 将图片文件输出到 static/imgs 目录中
            //   // 将图片文件命名 [hash:8][ext][query]
            //   // [hash:8]: hash值取8位
            //   // [ext]: 使用之前的文件扩展名
            //   // [query]: 添加之前的query参数
            //   filename: "static/imgs/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/media/[hash:8][ext][query]",
            // },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],
  optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 其他内容用默认配置即可
    },
    // 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};
```



#### Core-js

##### 为什么

过去我们使用 babel 对 js 代码进行了兼容性处理，其中使用@babel/preset-env 智能预设来处理兼容性问题

它能将 ES6 的一些语法进行编译转换，比如箭头函数、点点点运算符等。但是如果是 async 函数、promise 对象、数组的一些方法（includes）等，它没办法处理

所以此时我们 js 代码仍然存在兼容性问题，一旦遇到低版本浏览器会直接报错。所以我们想要将 js 兼容性问题彻底解决



##### 是什么

`core-js` 是专门用来做 ES6 以及以上 API 的 `polyfill`

`polyfill`翻译过来叫做垫片/补丁。就是用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性



##### 怎么用

1.  修改 main.js

   ```javascript
   import count from "./js/count";
   import sum from "./js/sum";
   // 引入资源，Webpack才会对其打包
   import "./css/iconfont.css";
   import "./css/index.css";
   import "./less/index.less";
   import "./sass/index.sass";
   import "./sass/index.scss";
   import "./styl/index.styl";
   
   const result1 = count(2, 1);
   console.log(result1);
   const result2 = sum(1, 2, 3, 4);
   console.log(result2);
   // 添加promise代码
   const promise = Promise.resolve();
   promise.then(() => {
     console.log("hello promise");
   });
   ```

   此时 Eslint 会对 Promise 报错

   

2. 修改配置文件

   - 下载包

     ```
     npm i @babel/eslint-parser -D
     ```

   - .eslintrc.js

     ```javascript
     module.exports = {
       // 继承 Eslint 规则
       extends: ["eslint:recommended"],
       parser: "@babel/eslint-parser", // 支持最新的最终 ECMAScript 标准
       env: {
         node: true, // 启用node中全局变量
         browser: true, // 启用浏览器中全局变量
       },
       plugins: ["import"], // 解决动态导入import语法报错问题 --> 实际使用eslint-plugin-import的规则解决的
       parserOptions: {
         ecmaVersion: 6, // es6
         sourceType: "module", // es module
       },
       rules: {
         "no-var": 2, // 不能使用 var 定义变量
       },
     };
     ```

   

3.  运行指令

   ```
   npm run build
   ```

   此时观察打包输出的 js 文件，我们发现 Promise 语法并没有编译转换，所以我们需要使用 `core-js` 来进行 `polyfill`

   

4. 使用 `core-js`

   - 下载包

     ```
     npm i core-js
     ```

   - 手动全部引入

     ```javascript
     import "core-js";
     import count from "./js/count";
     import sum from "./js/sum";
     // 引入资源，Webpack才会对其打包
     import "./css/iconfont.css";
     import "./css/index.css";
     import "./less/index.less";
     import "./sass/index.sass";
     import "./sass/index.scss";
     import "./styl/index.styl";
     
     const result1 = count(2, 1);
     console.log(result1);
     const result2 = sum(1, 2, 3, 4);
     console.log(result2);
     // 添加promise代码
     const promise = Promise.resolve();
     promise.then(() => {
       console.log("hello promise");
     });
     ```

     这样引入会将所有兼容性代码全部引入，体积太大了。我们只想引入 promise 的 `polyfill`

   - 手动按需引入

     ```javascript
     import "core-js/es/promise";
     import count from "./js/count";
     import sum from "./js/sum";
     // 引入资源，Webpack才会对其打包
     import "./css/iconfont.css";
     import "./css/index.css";
     import "./less/index.less";
     import "./sass/index.sass";
     import "./sass/index.scss";
     import "./styl/index.styl";
     
     const result1 = count(2, 1);
     console.log(result1);
     const result2 = sum(1, 2, 3, 4);
     console.log(result2);
     // 添加promise代码
     const promise = Promise.resolve();
     promise.then(() => {
       console.log("hello promise");
     });
     ```

     只引入打包 promise 的 `polyfill`，打包体积更小。但是将来如果还想使用其他语法，我需要手动引入库很麻烦

   - 自动按需引入

     - main.js

       ```javascript
       import count from "./js/count";
       import sum from "./js/sum";
       // 引入资源，Webpack才会对其打包
       import "./css/iconfont.css";
       import "./css/index.css";
       import "./less/index.less";
       import "./sass/index.sass";
       import "./sass/index.scss";
       import "./styl/index.styl";
       
       const result1 = count(2, 1);
       console.log(result1);
       const result2 = sum(1, 2, 3, 4);
       console.log(result2);
       // 添加promise代码
       const promise = Promise.resolve();
       promise.then(() => {
         console.log("hello promise");
       });
       ```

     - babel.config.js

       ```javascript
       module.exports = {
         // 智能预设：能够编译ES6语法
         presets: [
           [
             "@babel/preset-env",
             // 按需加载core-js的polyfill
             { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
           ],
         ],
       };
       ```

       此时就会自动根据我们代码中使用的语法，来按需加载相应的 `polyfill` 了



#### PWA

##### 为什么

开发 Web App 项目，项目一旦处于网络离线情况，就没法访问了

我们希望给项目提供离线体验



##### 是什么

渐进式网络应用程序(progressive web application - PWA)：是一种可以提供类似于 native app(原生应用程序) 体验的 Web App 的技术

其中最重要的是，在 **离线(offline)** 时应用程序能够继续运行功能

内部通过 Service Workers 技术实现的



##### 怎么用

1.  下载包

   ```
   npm i workbox-webpack-plugin -D
   ```

2.  修改配置文件

   ```javascript
   const os = require("os");
   const path = require("path");
   const ESLintWebpackPlugin = require("eslint-webpack-plugin");
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
   const TerserPlugin = require("terser-webpack-plugin");
   const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
   const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
   const WorkboxPlugin = require("workbox-webpack-plugin");
   
   // cpu核数
   const threads = os.cpus().length;
   
   // 获取处理样式的Loaders
   const getStyleLoaders = (preProcessor) => {
     return [
       MiniCssExtractPlugin.loader,
       "css-loader",
       {
         loader: "postcss-loader",
         options: {
           postcssOptions: {
             plugins: [
               "postcss-preset-env", // 能解决大多数样式兼容性问题
             ],
           },
         },
       },
       preProcessor,
     ].filter(Boolean);
   };
   
   module.exports = {
     entry: "./src/main.js",
     output: {
       path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
       // [contenthash:8]使用contenthash，取8位长度
       filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
       chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
       assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
       clean: true,
     },
     module: {
       rules: [
         {
           oneOf: [
             {
               // 用来匹配 .css 结尾的文件
               test: /\.css$/,
               // use 数组里面 Loader 执行顺序是从右到左
               use: getStyleLoaders(),
             },
             {
               test: /\.less$/,
               use: getStyleLoaders("less-loader"),
             },
             {
               test: /\.s[ac]ss$/,
               use: getStyleLoaders("sass-loader"),
             },
             {
               test: /\.styl$/,
               use: getStyleLoaders("stylus-loader"),
             },
             {
               test: /\.(png|jpe?g|gif|svg)$/,
               type: "asset",
               parser: {
                 dataUrlCondition: {
                   maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                 },
               },
               // generator: {
               //   // 将图片文件输出到 static/imgs 目录中
               //   // 将图片文件命名 [hash:8][ext][query]
               //   // [hash:8]: hash值取8位
               //   // [ext]: 使用之前的文件扩展名
               //   // [query]: 添加之前的query参数
               //   filename: "static/imgs/[hash:8][ext][query]",
               // },
             },
             {
               test: /\.(ttf|woff2?)$/,
               type: "asset/resource",
               // generator: {
               //   filename: "static/media/[hash:8][ext][query]",
               // },
             },
             {
               test: /\.js$/,
               // exclude: /node_modules/, // 排除node_modules代码不编译
               include: path.resolve(__dirname, "../src"), // 也可以用包含
               use: [
                 {
                   loader: "thread-loader", // 开启多进程
                   options: {
                     workers: threads, // 数量
                   },
                 },
                 {
                   loader: "babel-loader",
                   options: {
                     cacheDirectory: true, // 开启babel编译缓存
                     cacheCompression: false, // 缓存文件不要压缩
                     plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                   },
                 },
               ],
             },
           ],
         },
       ],
     },
     plugins: [
       new ESLintWebpackPlugin({
         // 指定检查文件的根目录
         context: path.resolve(__dirname, "../src"),
         exclude: "node_modules", // 默认值
         cache: true, // 开启缓存
         // 缓存目录
         cacheLocation: path.resolve(
           __dirname,
           "../node_modules/.cache/.eslintcache"
         ),
         threads, // 开启多进程
       }),
       new HtmlWebpackPlugin({
         // 以 public/index.html 为模板创建文件
         // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
         template: path.resolve(__dirname, "../public/index.html"),
       }),
       // 提取css成单独文件
       new MiniCssExtractPlugin({
         // 定义输出文件名和目录
         filename: "static/css/[name].[contenthash:8].css",
         chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
       }),
       // css压缩
       // new CssMinimizerPlugin(),
       new PreloadWebpackPlugin({
         rel: "preload", // preload兼容性更好
         as: "script",
         // rel: 'prefetch' // prefetch兼容性更差
       }),
       new WorkboxPlugin.GenerateSW({
         // 这些选项帮助快速启用 ServiceWorkers
         // 不允许遗留任何“旧的” ServiceWorkers
         clientsClaim: true,
         skipWaiting: true,
       }),
     ],
     optimization: {
       minimizer: [
         // css压缩也可以写到optimization.minimizer里面，效果一样的
         new CssMinimizerPlugin(),
         // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
         new TerserPlugin({
           parallel: threads, // 开启多进程
         }),
         // 压缩图片
         new ImageMinimizerPlugin({
           minimizer: {
             implementation: ImageMinimizerPlugin.imageminGenerate,
             options: {
               plugins: [
                 ["gifsicle", { interlaced: true }],
                 ["jpegtran", { progressive: true }],
                 ["optipng", { optimizationLevel: 5 }],
                 [
                   "svgo",
                   {
                     plugins: [
                       "preset-default",
                       "prefixIds",
                       {
                         name: "sortAttrs",
                         params: {
                           xmlnsOrder: "alphabetical",
                         },
                       },
                     ],
                   },
                 ],
               ],
             },
           },
         }),
       ],
       // 代码分割配置
       splitChunks: {
         chunks: "all", // 对所有模块都进行分割
         // 其他内容用默认配置即可
       },
     },
     // devServer: {
     //   host: "localhost", // 启动服务器域名
     //   port: "3000", // 启动服务器端口号
     //   open: true, // 是否自动打开浏览器
     // },
     mode: "production",
     devtool: "source-map",
   };
   ```

3.  修改 main.js

   ```javascript
   import count from "./js/count";
   import sum from "./js/sum";
   // 引入资源，Webpack才会对其打包
   import "./css/iconfont.css";
   import "./css/index.css";
   import "./less/index.less";
   import "./sass/index.sass";
   import "./sass/index.scss";
   import "./styl/index.styl";
   
   const result1 = count(2, 1);
   console.log(result1);
   const result2 = sum(1, 2, 3, 4);
   console.log(result2);
   // 添加promise代码
   const promise = Promise.resolve();
   promise.then(() => {
     console.log("hello promise");
   });
   
   const arr = [1, 2, 3, 4, 5];
   console.log(arr.includes(5));
   
   if ("serviceWorker" in navigator) {
     window.addEventListener("load", () => {
       navigator.serviceWorker
         .register("/service-worker.js")
         .then((registration) => {
           console.log("SW registered: ", registration);
         })
         .catch((registrationError) => {
           console.log("SW registration failed: ", registrationError);
         });
     });
   }
   ```

4.  运行指令

   ```
   npm run build
   ```

   此时如果直接通过 VSCode 访问打包后页面，在浏览器控制台会发现 `SW registration failed`

   因为我们打开的访问路径是：`http://127.0.0.1:5500/dist/index.html`。此时页面会去请求 `service-worker.js` 文件，请求路径是：`http://127.0.0.1:5500/service-worker.js`，这样找不到会 404

   实际 `service-worker.js` 文件路径是：`http://127.0.0.1:5500/dist/service-worker.js`

5.  解决路径问题

   - 下载包

     ```
     npm i serve -g
     ```

     serve 也是用来启动开发服务器来部署代码查看效果的

   - 运行指令

     ```
     serve dist
     ```

     此时通过 serve 启动的服务器我们 service-worker 就能注册成功了



### 高级篇总结

我们从 4 个角度对 webpack 和代码进行了优化：

1. 提升开发体验
   - 使用 `Source Map` 让开发或上线时代码报错能有更加准确的错误提示
2. 提升 webpack 提升打包构建速度
   - 使用 `HotModuleReplacement` 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快
   - 使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快
   - 使用 `Include/Exclude` 排除或只检测某些文件，处理的文件更少，速度更快
   - 使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快
   - 使用 `Thead` 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）
3. 减少代码体积
   - 使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小
   - 使用 `@babel/plugin-transform-runtime` 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小
   - 使用 `Image Minimizer` 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）
4. 优化代码运行性能
   - 使用 `Code Split` 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源
   - 使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好
   - 使用 `Network Cache` 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好
   - 使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器
   - 使用 `PWA` 能让代码离线也能访问，从而提升用户体验