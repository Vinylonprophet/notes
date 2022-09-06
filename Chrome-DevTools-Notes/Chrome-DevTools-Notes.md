## Chrome-DevTools-Notes

### 1.DevTools 简介

#### **开发者工具的快捷键**

ctrl+shift+I

#### **八个面板**

1. 元素面板
2. 控制台面板
3. 源代码面板
4. 网络面板
5. 性能面板
6. 内存面板
7. 应用面板
8. 安全面板

#### **1.元素面板(Elements)**

自由操作 DOM 和 CSS 来迭代布局和设计界面

- 检查和调整页面
- 编辑样式
- 编辑DOM

#### **2.控制台面板(Console)**

在开发期间，可以使用控制台面板记录诊断信息，或者使用它作为 shell 在页面上与 JavaScript 交互

- 使用控制台面板
- 命令行交互

#### **3.源代码面板(Sources)**

- 断点调试
- 调试混淆的代码
- Workspaces进行持久化保存

#### **4.网络面板(Network)**

使用网络面板了解请求和下载的资源文件并优化网页加载性能

- 网络面板基础
- 了解资源时间轴
- 网络带宽限制

#### **5.性能面板(Performance)**

使用时间轴面板可以通过记录和查看网站生命周期内发生的各种事件来提高页面的运行时性能

#### **6.内存面板(Memory)**

如果需要比时间轴面板提供的更多信息，可以使用“配置”面板，例如跟踪内存泄漏

- JavaScript CPU 分析器
- 内存堆区分析器

#### **7.应用面板(Application)**

使用资源面板检查加载的所有资源，包括 IndexedDB 与 Web SQL 数据库，本地和会话存储，cookie ，应用程序缓存，图像，字体和样式表

- 管理数据

#### **8.安全面板(Security)**

使用安全面板调试混合内容问题，证书问题等等

- 安全



### 2.Copying & Saving

#### **1.Copy( . . . )**

全局方法copy( )再console里copy任何可以拿到的资源, 包括 copy($_) 或 copy($0)

example1:

​	location

​	copy(location)

```json
{
  "ancestorOrigins": {},
  "href": "https://juejin.cn/book/6844733783166418958/section/6844733783204167693",
  "origin": "https://juejin.cn",
  "protocol": "https:",
  "host": "juejin.cn",
  "hostname": "juejin.cn",
  "port": "",
  "pathname": "/book/6844733783166418958/section/6844733783204167693",
  "search": "",
  "hash": ""
}
```

example2:

​	msg = "well ".repeat(3)

​	copy($_)

```
well well well 
```

#### **2.Store as global (存储为一个全局变量)**

console了一堆数据, 如果想在不影响原来值的情况下, 可以将他转换成一个全局变量, **右击**选择**Store as global variable**

example:

​	第一次使用会创建一个叫做 temp1 的变量, 第二次创建为 temp2 的变量 ... ...

#### **3.保存堆栈信息( stack trace )**

右击 save as... 

#### **4.直接Copy HTML**

右击 / 三个点 / ctrl+c



### 3.快捷键和通用技巧

#### **1.切换 DevTool 窗口的展示布局**

ctrl + shift + D

#### **2.切换 DevTool 的面板**

ctrl + [ 和  ctrl + ]  可以从当前面板的分别向左和向右切换面板

ctrl + 数字 直接跳转面板

#### **3.递增和递减**

alt + 上下 0.1

上下 1

shift + 上下 10

ctrl + 上下 100

#### **4.elements， logs， sources & network 中的查找**

快捷键: ctrl + F

Aa: 匹配大小写

.*: 正则表达式



### 4.使用 Command

#### **快捷键**

ctrl + shift + P

#### **1.截屏**

command 下搜索 screenshot

example:

​	选中一个节点, 然后 screenshot 选中node, 就会截到 node 的图

#### **2.快速切换面板**

DevTools 一般双面板, 一个 Element 一个 Source

输入layout进行调试

#### **3.快速切换主题**

输入theme



### 5.代码块的使用

#### **作用**

自己的代码块可以放在 Sources, 在 Snippet 中新建一个代码块, 然后输入代码保存, 右击或者 ctrl + enter 运行

#### **运行其他来源的代码块**

如果在 DevTools 中预设了一组代码块之后, 在 Command Menu 的输入框中输入 ! 根据名字选择



### 6.Console 中的 '$'

#### **1.$0**

$0是对当前选择节点的引用, $1是对上次选择节点的引用, 一直到$4

**Example**

控制台中是输入

$1.appendChild($0)

#### **2. $  和  ?**

如果没有在 App 中定义过变量 $, (例如jQuery), 在 console 中就是对一大串函数 document.querySelector 的别名

如果 ? 还能节约更多时间, 不仅执行 document.QuerySelectorAll, 并且返回的是一个**节点**的数组, 而不是一个 Node list

本质上来说 `Array.from(document.querySelectorAll('div')) === ?('div')` ，但是`document.querySelectorAll('div')` 和 `?('div')` 哪一种方式更加优雅呢？