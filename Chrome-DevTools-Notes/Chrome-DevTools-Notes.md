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

除了log的更好的操作

#### 1. console.assert

console.assert(assertion, obj [, obj2, ... , objN]);

console.assert(assertion, msg [, subst1, ..., substN]);

当我们传入的第一个参数为 **假** 时，console.assert 打印跟在这个参数后面的值

**Example1**

```javascript
value = null 
console.assert(value, '"Value" is empty!')
```

Assertion failed: "Value" is empty!
undefined

**Example2**

```javascript
value = null
if(!value) {
	console.log('"Value" is empty!'')
}
```

"Value" is empty!

undefined

通过它, 可以拜托令人讨厌的 if 表达式, 还能获得堆栈信息

#### 2. 增加 log 的阅读体验

有时使用 console.log 之后, 可能会忘记哪一个是哪一个, 如果有一些想要输出但是看上去不是很容易阅读的数据时, 可以打印一个对象, 将所有参数包装在大括号中

**Example**

```javascript
const myName = 'Tomek';
const pencilsCount = 7;
const timestampNow = +new Date();
const id = 5;
console.log(myName, pencilsCount, timestampNow, id);
```

结果输出: Tomek 7 1545067070874 5

```javascript
console.log({myName, pencilsCount, timestampNow, id});
```

结果输出: {myName: "Tomek", pencilsCount: 7, timestampNow: 1545067123641, id: 5}

#### 3. console.table

 如果有一个 **数组** (或者是 **类数组** 的对象，或者就是一个 **对象** )需要打印, 可以使用 console.table 将他以一个表格形式打印出来, 不仅会根据数组中包含的对象的所有属性去计算表中列名, 而且这些列都是可以缩放和排序的

#### 4. table 和 {} 配合

```JavaScript
console.table({myName, pencilsCount, timestampNow, id});
```

#### 5. console.dir

有时想要打印一个 DOM 节点, console.log 会将这个交互式渲染成像是从 Elements 中剪出来的一样, 如果想要查看关联到的真实的js对象, 并且查看他的属性

console. dir

**Example**

```javascript
console.dir(li)
```

#### 6. 给 logs 加上时间戳

开启 **timestamps** 在 Commend Menu 中开启 timestamps

#### 7. 监测执行时间

console.time() 开启一个计时器

console.timeEnd() 结束计时并将结果在 console 中打印出来

#### 8. 给 console.log 加上 CSS 样式

#### 9. 让 console.log 基于调用堆栈自动缩进

配合 Error 对象的 stack 属性, 让 log 可以根据堆栈的调用自动缩进

```javascript
function log(message) {
      console.log(
        // 这句话是重点当我们 new 出来的 Error 对象时，会匹配它的stack 信息中的换行符，换行符出现的次数也等同于它在堆栈调用时的深度。
        ' '.repeat(new Error().stack.match(/\n/g).length - 2) + message
      );
    }

    function foo() {
      log('foo');
      return bar() + bar();
    }

    function bar() {
      log('bar');
      return baz() + baz();
    }

    function baz() {
      log('baz');
      return 17;
    }

    foo();
```

#### 10. 直接在回调中使用 console.log

- 在回调方法的内部使用 `console.log`
- **直接使用 consolelog 来作为回调方法 (推荐)**

#### 11. 使用实时表达式

眼镜的符号 (live expression) 可以自定义任何 JS 表达式, 会不断更新, 所以表达的结果永远存在

还能同时定义好几个



### 13. Network 的骚操作

#### 1.隐藏network overview

查看 network 面板是为了

- 看看请求的时间轴信息
- 看看请求列表 - 确认下请求状态, 资源大小和响应结果

(此处我的Chrome本来就没有overview)

#### 2. Request initiator 显示了调用堆栈信息

initiator 这一列显示了哪个脚本哪一行触发了请求, 显示在调用堆栈中触发请求的最后一步

如果用的是一个本地化的api如 fetch , 那么会指向一些底层级的类库代码

除了这些, 如果希望查看代码的哪一部分出发了请求, 将鼠标悬停在显示的 initiator 上, 将看到完整的调用堆栈

#### 3. 请求过滤

filter 输入框接受字符串或正则表达式, 对应显示匹配的请求

比如: 输入 method 或者 mime-type

如果想显示所有可能的关键字, 在空白输入框按下 ctrl + space

#### 4. 自定义请求表

请求表中, 可以看到有关每个请求的几条信息, 如: Status, Type, Initiator, Size 和 Time

表头处右击进行增删

#### 5. 重新发送 XHR 请求

XHR 右击 Replay XHR

#### 6. XHR / fetch 断点

在 Sources 下的 XHR/fetch Breakpoints 打断点



### 14. 元素面板 - 技巧集合

#### 1. 通过 'h' 来隐藏元素

选中元素, 按 h 隐藏, 通常截图时使用

#### 2. 拖动 & 放置 元素

选中元素, 拖动DOM

#### 3. 使用 control 来移动元素

ctrl + 方向键 类似于拖动元素

#### 4. 元素面板中类似于基础编辑器的操作

编辑, ctrl + z 撤回, 等等

#### 5. shadow editor 阴影编辑器

在 style 面板中点击靠近 box-shadow 属性或 text-shadow 属性的阴影方形符号来打开

#### 6. Timing function editor 定时函数编辑器

也称为 Cubic bezier (贝塞尔) 编辑器

是用一串来定义 CSS 的动画速度在整个动画过程中如何变化的数值, 将其定义为 transition-timing-function 或者 animation-timing-function CSS属性

注意:

1. 如果 timing 函数的值没有设置在简写形式中, 边上的符号就不会显示出来

2. 这个符号有点类似于阴影编辑器, 不过是一个曲线符号

#### 7. 插入样式规则的按钮

如果把鼠标放在样式选择器的选择区域的最后时, 会看到几个开业i快速使用的 color 和 shadow 编辑器添加 css 属性的按钮

#### 8. 在元素面板中展开所有子节点

右击节点后的 expand recursively

#### 9. DOM 断点

有时脚本修改了 DOM , 我们可以添加一个 DOM 断点: 监听节点被添加或者移除 / 属性被改变

- 点击"..." 符号或者右击你想添加监听的元素
- 选择 `subtree modifications` :监听任何它内部的节点被 `移除` 或者 `添加`的事件
- 选择 `attribute modifications` :监听任何当前选中的节点被 `添加`，`移除` 或者 `被修改值`的事件
- 选择 `node removal` :监听被选中的元素被 `移除` 的事件

页面重新加载时会记住断点, 设置一个或多个断点, 可能都忘了它们所标记的位置, 在Element视图中会有提示, 会用高亮展示出来



#### 15. 元素面板 - 颜色选择器

#### 1. 只选择你正在使用的颜色

- 切换到一个有色调变化的 `Material` 调色板
- 自定义，可以添加和删除颜色
- 从 CSS Variables中选择一个你当前页面使用的样式表中存在的颜色。
- 或者所有你在页面的 `CSS` 中使用的颜色

#### 2. 直观选择颜色

直观选择



### 16. Drawer 常识

#### 1. 如何打开 Drawer ?

在任何面板中按下 ESC 显示 / 隐藏

#### 2. Drawer 里有什么 ?

可以在 Commend Menu 中输入 Drawer 来打开

或者就是 Drawer 左上角的三个点

#### 3. 控制传感器

#### 4. 模拟网络状态

比如: 可以模拟3G网络, 或者测试应用的离线功能, 还可以模拟特定的用户代理

#### 5. 拿到 Source

#### 6. 检查代码 coverage

实际开发中, 可能不需要位于尾部的许多代码, 可能是因为这是来自外部库的一大块 JS , 也可能是被遗忘的一些 CSS 规则, 它们不匹配任何东西

使用 coverage 面板获得关于冗余代码的摘要 - 细节信息, 使用 Drawer 菜单或者 Command 菜单打开

可以用来跟踪 JS 和 CSS 文件的 哪些被执行, 并显示 未使用字节的百分比

绿线是已运行

红线是未运行

#### 7. 检查修改的内容

Command Menu 中打开 change



### 17. workspace 技巧

#### 1. 在 Chrome 中修改文件

代码执行的位置是最容易编辑代码的位置, 如果把项目的文件夹直接拖到 Source 面板, DevTools 会将修改同步到系统文件中

#### 2. Workspace 支持即使同步样式

一旦设置好了 DevTools workspace, 就可以在Source面板中编辑 HTML 和 JS 文件, 按住 ctrl + s 后被保存在文件系统中

#### 3.  为新选择器选择目标位置

向现有选择器添加新样式, 可以在 Element 中的 Style 下的 .cls 右边的加号长按

#### 4. Workspace 允许 Css 注入

设置了workspace之后, 浏览器的更改不仅持久保存到文件系统中, css的更改保存在文件系统后, 立刻被浏览器选中并显示在页面上, 不需要刷新



### 18. 更多学习网站

#### 1. Google Chrome Developers

高度推荐你订阅 `Google Chrome Developers` 的 `YouTube` 频道，这是在 `Chrome` 中展示已有的新内容的地方。 不仅如此，你还可以去那里寻找有关最佳实践，`JavaScript` 演变等的讨论。对于任何一位前端开发人员来说，这里都有许多有价值的内容。

[Google Chrome Developers - YouTube](https://link.juejin.cn/?target=https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCnUYZLuoy1rq1aVMwx4aTzw)

#### 2. [Developers.google.com](https://link.juejin.cn/?target=Developers.google.com)

当我在撰写这个系列时，除了分享最喜欢的功能和技术积累之外，也在查阅 [Developers.google.com](https://link.juejin.cn/?target=Developers.google.com) ，你可以 （“按年”）或 技术（“按标签”）去查询一些有关特定更新的信息，例如关于最近发布的 `Chrome 71` ：

[New in Chrome 71](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Fupdates%2F2018%2F12%2Fnic71)