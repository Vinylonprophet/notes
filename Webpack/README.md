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

