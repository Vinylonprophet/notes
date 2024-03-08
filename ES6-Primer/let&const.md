# let和const命令

## 1. let命令

### 1.1 基本用法

声明变量只在let命令所在的代码块内有效：

```js
{
	let a = 10;
	var b = 1;
}

b	// 1
a	// ReferenceError: a is not defined
```



let命令在for循环计数器中的作用：

```js
for(let i = 0; i < 10; i++){
    // ...
}
console.log(i); // ReferenceError: a is not defined
```



下面分别用var和let输出的结果：

**var：**

```js
var a = [];
for(var i = 0; i < 10; i++){
    a[i] = function(){
		console.log(i);
    }
}
a[6]();	// 10
```

**let：**

```js
var a = [];
for(let i = 0; i < 10; i++){
	a[i] = function(){
		console.log(i);
    }
}
a[6]();	// 6
```

**注意：**JS引擎内部会记住上一轮循环的值，初始化本轮变量i时，就在上一轮循环的基础上进行计算。



设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域：

```js
for(let i = 0; i < 3; i++){
	let i = 'abc';
    console.log(i);
}
// abc*3
```



### 1.2 不存在变量提升

```js
// var的情况
console.log(foo);	// 2
var foo = 2;

// let的情况
console.log(bar);	// ReferenceError
let bar = 2;
```



### 1.3 暂时性死区

只要块级作用域内存在let命令，他的变量就绑定这个区域，不受外部影响：

```js
var temp = 123;

if(true){
	temp = 'abc';	// ReferenceError
	let temp;
}
```

**注意：**ES6规定，只要区块中存在let和const命令，则这个区块对这些命令声明的变量从一开始就形成封闭作用域。

包括typeof，以前的**typeof**是百分之百安全的，但从暂时性死区开始不成立



### 1.4 不允许重复声明

let不允许在相同作用域内重复声明同一个变量，因此不能在函数内部重新声明参数：

```js
// 报错
function(){
    let a = 10;
    var a = 1;
}

// 报错
function(){
	let a = 10;
    let a = 1;
}

function(args){
	let arg;	// 报错
}

function(args){
    {
		let arg;	// 不报错
	}
}
```



## 2. 块级作用域

### 2.1 为什么要块级作用域

ES5只有全局和函数作用域，没有块级，这会导致一些很不合理的场景：

第一种，内层变量覆盖外层变量：

```js
var tmp = new Date();

function f(){
	console.log(tmp);
    if(false){
        var tmp = 'hello world';
    }
}

f();	// undefined
```

以上代码是因为函数f执行之后，由于变量提升导致内层的tmp变量覆盖了外层的tmp变量。



第二种，循环遍历泄露为全局变量：

```js
var s = 'hello';
for(var i = 0; i < s.length; i++){
	console.log(s[i]);
}
console.log(i);	// 5
```

循环结束后，i泄露为全局变量。



### 2.2 ES6的块级作用域

let为JavaScript新增了块级作用域：

```js
function f1(){
    let n = 5;
    if(true){
        let n = 10;
    }
    console.log(n);	// 5
}
```



ES6的嵌套：

```js
{{{{{ let insane = 'Hello World' }}}}}

{{{{
    { let insane = 'Hello World'  }
    console.log(insane);
}}}}

{{{{
    let insane = 'Hello World';
    { let insane = 'Hello World' }
}}}}
```



因为块级作用域的出现，所以IIFE不必再要了
```js
(function(){
	var tmp = ...;
	...
})()

{
    let tmp = ...;
	...
}
```



### 2.3 块级作用域与函数声明

ES5规定，函数只能在顶层作用域和函数作用域之中声明，下面是两种错误ES5代码：

```js
// 情况一
if(true){
    function f(){}
}

// 情况二
try{
    function f(){}
} catch(e){
    // ...
}
```



ES6中在块级作用域中函数声明类似于let，在块级作用域之外不可引用：

```js
function f(){console.log('I am outside!')}

(function(){
	if(false){
		function f(){console.log('I am inside!')}
	}
    f();
}())
```

在ES5中会得到 I am inside! ，因为if内声明的函数f会被提升到函数头部，实际代码是：

```js
function f(){console.log('I am outside!')}

(function(){
    function f(){console.log('I am inside!')}
	if(false){

	}
    f();
}())
```

但是在ES6中理论上会得到'I am outside!'，但是真的在浏览器上执行会报错。

因为在 JavaScript 中，函数声明会被提升到所在作用域的顶部，但是在条件块内部进行了声明，且条件为 `false`，导致这个函数声明并不会被提升或者执行。这会导致在立即执行函数内部的 `f()` 调用时，解析器在其作用域中找不到 `f`，从而报错指出 `f is not a function`。

```js
function f(){console.log('I am outside!')}

(function(){
    var f = undefined;
	if(false){
		function f(){console.log('I am inside!')}
	}
    f();
}())
```



ES6在附录B中规定，浏览器的实现可以不遵守上面的规定，而有自己的行为方式：

1. 允许在块级作用域内声明函数
2. 函数声明类似于var，会提升到全局作用域或函数作用域的头部
3. 同时，函数声明还会提升到所在的块级作用域的头部

**理解2与3的例子：**

```js
// 第二点
console.log(foo); // undefined
var foo = 'hello';

if (false) {
  function foo() {
    console.log('I am inside!');
  }
}

console.log(foo); // hello

// 第三点
console.log(foo); // [Function: foo]
var foo = 'hello';

if (true) {
  function foo() {
    console.log('I am inside!');
  }
}

console.log(foo); // hello
```

所以，应避免在块级作用域内声明函数。如果确定需要，请写成函数表达式的形式，而不是函数声明语句。

```js
// 函数声明语句
{
    let a = 'secret';
    function f(){
    	return a;
	}
}

// 函数表达式
{
    let a = 'secret';
    let f = function (){
    	return a;
	}
}
```

**注意：**ES6的块级作用域允许声明函数的规则只在`大括号`的情况下成立，没有大括号就会报错。



### 2.4 do表达式

本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。

```js
{
	let t = f();
	t = t * t + 1;
}
```

块级作用域将两个语句封装在一起，但是在块级作用域以外没有办法得到t的值，除非t是全局变量。

现在有一个提案使块级作用域变为表达式即可以返回值，办法是在作用域之前加上do，使他变为do表达式：

```js
let x = do{
    let t = f();
    t * t + 1;
}
```

上面代码中，变量x会得到整个块级作用域的返回值。



## 3. const命令

### 3.1 基本用法

const声明一个只读的量，一旦声明，常量的值就不能改变

```js
const PI = 3.14;
PI = 3.1415926;	// TypeError: Assignment to constant variable
```



const只声明不赋值就会报错

```js
const a;	// SyntaxError: Missing initializer in const declaration
```



**注意：**const和let一样，都是块级作用域，都存在暂时性死区，不可重复声明



### 3.2 本质

本质上保证的是内存地址不得改动，对于简单类型的数据而言 （`数值`、`字符串`、`布尔值`）而言，值就存在变量指向的内存地址中，因此等同于常量；对于复合类型的数据而言（主要是`对象`和`数组`）而言，变量指向的内存地址保存的只是一个指针，const只能保证这个**指针固定**，至于指向的数据结构是不是可变的，完全不能控制。

对象：

```js
const foo = {};

foo.prop = 123;
foo.prop	// 123

// 将foo指向另一个对象，报错
foo = {};	// TypeError: Assignment to constant variable
```

数组：

```js
const a = [];
a.push('Hello');
a.length = 0;
a = ['Dave'];	// TypeError: Assignment to constant variable
```

所以要想完全冻结对象，应该使用Object.freeze方法

```js
const foo = Object.freeze({});

// 常规模式不起作用
// 严格模式报错
foo.prop = 123;
```

将对象彻底冻结的函数：

```js
var constantize = (obj) => {
	Object.freeze(obj);
    Object.keys(obj).forEach((key, i) => {
		if(typeof obj[key] === 'object'){
            constantize(obj[key]);
        }
    })
}
```



### 3.3 ES6声明变量的6种方式

ES5有两种声明方式：

1. var
2. function

ES6新增四种声明方式：

1. let
2. const
3. import
4. class



### 3.4 顶层对象的属性

顶层对象在`浏览器`中是指window，`Node`环境中指global对象，ES5中，顶层对象属性与全局变量是等价的。

```js
window.a = 1;
a;			// 1

b = 2;
window.b;	// 2
```

这是JavaScript很大的败笔



ES6为了改变这一现象：

一方面规定，为了保持兼容性，var和function命令声明的全局变量依旧是顶层对象的属性；

另一方面规定，let，const，class命令声明的全局变量不属于顶层对象的属性。

所以从ES6开始，全局变量和顶层对象逐渐隔离。

```js
let b = 1;
window.b;	// undefined
```



### 3.5 global对象

ES5顶层对象是一个很大的问题，在各种实现中是不统一的。

- 在浏览器中的顶层对象是window，但是Node和Web Worker没有。
- 在浏览器和Web Worker中，self指向顶层对象，但Node没有self。
- 在Node中顶层对象是global，但其他环境不支持。

同一段代码为了能在各种环境中都取到顶层对象，目前一般使用this，但是有局限性。

- 全局环境中，this会返回顶层对象。但是Node和ES6中this返回的是当前模块。
- 函数中的this，如果函数不是作为对象的方法运行，只是单纯作为函数运行，this会指向顶层对象。严格模式下返回undefined。
- 严格和普通模式，new Function('return this')()总会返回全局对象，但是如果浏览器使用了CSP，那么eval和new Function都可能无法使用。



以下是两种勉强在所有情况下都取到顶层对象的方法：

**方法一：**

```js
(typeof window !== 'undefined'
? window
: (typeof process === 'object' &&
? typeof require === 'function' &&
: typeof global === 'object')
: this)
```

**方法二：**

```js
var getGlobal = function(){
	if(typeof slef !== 'undefined'){ return self; }
    if(typeof window !== 'undefined'){ return window; }
    if(typeof global !== 'undefined'){ return global; }
    throw new Error('unable to locate global object');
}
```



现在有一个提案：在语言标准引入global顶层对象

```js
// CommonJS写法
require('system.global/shim')();

// ES6模块写法
import shim from 'system.global/shim';
shim();
// 上面的代码保证各种环境中global对象都是存在的

// CommonJS的写法
var global = require('system.global');

// ES6的模块写法
import getGlobal from 'system.global';
const global = getGlobal();
// 上面的代码将顶层对象放入变量global中
```

