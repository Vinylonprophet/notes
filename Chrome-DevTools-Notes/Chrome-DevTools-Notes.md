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

控制台中输入

$1.appendChild($0)

#### **2. $  和  ?**

如果没有在 App 中定义过变量 $, (例如jQuery), 在 console 中就是对一大串函数 document.querySelector 的别名

如果 ? 还能节约更多时间, 不仅执行 document.QuerySelectorAll, 并且返回的是一个**节点**的数组, 而不是一个 Node list

本质上来说 `Array.from(document.querySelectorAll('div')) === ?('div')` ，但是`document.querySelectorAll('div')` 和 `?('div')` 哪一种方式更加优雅呢？

#### 3. $_

控制台输入 $_ , 即对上次结果的引用

**Example**

Math.random()

$_

#### 4. $i

Dev Tools 中使用npm的插件

Chrome 插件: Console Importer, 快速在console中引入和测试一些 npm 库

**Example**

控制台下输入 $i('lodash') 或 $i('moment') 几秒之后, 能得到 lodash 或 momentjs



### 7. console.log "bug"

```javascript
let person = {a:0, b:0, c:0, d:0, e:0, name:'Tomek'}
console.log(person);

person.a = 1;
person.name = "Not Tomek";
console.log(person);
```

以上代码 log 出的信息是一样的, 都是修改后的值

由此可知, console中打印出来的对象, 在打印之前, 是使用引用的方式保存的

可知:

- 打印一个从这个对象复制出来的对象。
- 使用资源面中的断点来调试
- 使用 `JSON.stringify()` 方法处理打印的结果
- 更多你可以想到的好方法~



### 8. 异步的console

越来越多的 API 都基于 Promise, 使用 promise 时经常配套 .then(处理方法) 或将 promise 放在 async 中, 再使用 await

console.log 是默认被 async 包裹的, 可以直接使用 await

#### 使用异步 console 来观察

**Example**

- Storage 系统的 **占用数** 和 **空闲数**

```javascript
await navigator.storage.estimate()
```

- 设备的 **电池信息**

```javascript
console.table(await navigator.getBattery())
```

- **媒体能力**

```javascript
query = {type: 'file', audio: {contentType:"audio/ogg"}}
console.table(await navigator.mediaCapabilities.decodingInfo(query)
```

- **Cache storage keys**

(注：Cache storage keys 一般用来对 `request` 和 `response` 进行缓存)

```javascript
await caches.keys()
```



### 9. Ninja console.log

#### 1. Conditional breakpoints 条件断点

设置一个条件断点

- 右击行号, 选择 Add conditional breakpoint
- 或右击已经存在的断点选择 Edit breakpoint
- 然后输入一个执行结果为 true 或者 false 的表达式（它的值其实不需要完全为 true 或者 false 尽管那个弹出框的描述是这样说的）。

表达式中可以使用任何这段代码可以获取到的值

如果条件成立，这个断点就会暂停代码的执行

#### 2. The ninja (console.log)

建立于条件断点

- 每一个条件都必须经过判断 - 当应用执行到这一行的时候进行判断
- 并且如果条件返回的是 falsy 的值(这里的 falsy 不是笔误，falsy 指的是被判定为 false 的值，例如 undefined )，不会被暂停

在条件断点中使用 console.log / console.table / console.time 等等连接到source中



### 10. 自定义格式转换器

custom Formatter 自定义输出对象的函数, 可以通过F1打开设置面板打勾 Enable custom formatters

formatter是一个对象, 最多包含三个方法

- header: 处理如何展示 console 的日志中的主要部分
- hasbody: 想显示一个用来展开对象的箭头, 返回true
- body: 定义将被显示在展开部分的内容中

一个基础的 formatter

```javascript
windows.devtoolsFormatters = [{
	header: function(obj){
		return ['div', {}, `${JSON.stringify(obj, null, 7)}`]
	},
	hasbody: function(){
		return false;
	}
}]
```

`header` 方法返回了一个 [JsonML](https://link.juejin.cn/?target=http%3A%2F%2Fwww.jsonml.org%2F)

注： `JsonML` : `JSON Markup Language` - `JSON` 标记语言

数组组成：

1. 标签名
2. 属性对象
3. 内容 (文本值或者其他元素)

输出时，formatter 对于每一层嵌套，直接以 `7` 个空格的缩进打印这个对象

#### 1. 自定义格式化转换器的应用实践

可供选择的 custom formatter, 可在[immutable-devtools ](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fandrewdavey%2Fimmutable-devtools)仓库中找到对于 [Immutable.js](https://link.juejin.cn/?target=https%3A%2F%2Ffacebook.github.io%2Fimmutable-js%2F) 结构的完美展示

也自己可以造一个

技巧: 不关心, 不需要区别对待的对象过滤, 直接在 header 方法里面 return null。让 DevTools 使用默认的格式化方式来处理这些值。

**Example**

```javascript
window.devtoolsFormatters = [{
    header: function(obj){
      if (!obj.__clown) {
        return null;
      }
      delete obj.__clown;
      const style = `
        color: red;
        border: dotted 2px gray;
        border-radius: 4px;
        padding: 5px;
      `
      const content = `🤡 ${JSON.stringify(obj, null, 2)}`;

      try {
        return ['div', {style}, content]
      } catch (err) { // for circular structures
        return null;  // use the default formatter
      }
    },
    hasBody: function(){
        return false;
    }
}]

console.clown = function (obj) {
  console.log({...obj, __clown: true});
}

console.log({message: 'hello!'});   // normal log
console.clown({message: 'hello!'}); // a silly log
```



### 11. 对象 & 方法

#### 1. queryObjects (对象查询) 方法

**Example**

```javascript
class Person{
	constructor(name, role){
		this.name = name;
		this.role = role;
	}
}

const john = new Person('John', 'dad');

let kids = {
	new Person('Mary', 'kid');
	new Person('Luke', 'kid');
};

new Person('Lucius', 'uncle');

console.log('How many people do we have ?');
```

除了最后一个都有

可以使用**queryObjects(Person)**查询

#### 2. monitor (镜像) 方法

**monitor** 可以让人潜入 **_function calls(方法的调用)** , 每一个被潜入的对象被调用时, console都会打印出来, 包含函数名和参数

**Example**

```javascript
class Person{
	constructor(name, role){
		this.name = name;
		this.role = role;
	}
}

greet(){
    return this.getMessage('greeting');
}

getMessage(type){
    if(type === 'greeting'){
        return `Hello, my name is ${this.name} !`;
    }
}
```

**console**

```javascript
john = new Person('John')

mary = new Person('Mary')

monitor(john.getMessage)
// 输出
undefined

john.greet()
//输出 方法名和`Hello, my name is ${this.name} !`
```

greet 方法通过一个特殊的参数来执行 getMessage 方法

#### 3. monitorEvents (镜像事件) 方法

除了用 monitor 方法监听, 还可以使用 monitorEvents 对 event 做一样的事情

**Example**

```javascript
monitorEvents($0, 'click')
```



### 12. console 的 骚操作

