import { fromEventPattern } from 'rxjs';

// 补充一个fromEventPattern,这个是给类事件使用的,意思就是指行为和事件很像,同时有注册以及移除监听两种行为,就比如DOM有addEventListener和removeEventListener
// 请出之前的代码
class Producer {
  listeners: any[];
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
      console.log('添加');
    } else {
      throw new Error('listener 必須是 function');
    }
  }
  removeListener(listener) {
    console.log('移除');
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
  notify(message) {
    this.listeners.forEach((listener) => {
      listener(message);
    });
  }
}

var egghead = new Producer();

// 同时将注册监听和移除监听传入fromEventPattern建立Observable
fromEventPattern(
  (handler) => egghead.addListener(handler),
  (handler) => egghead.removeListener(handler)
).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('finish');
  },
});

egghead.notify('Hello! Can you hear me?');

// 注意不要直接将方法传入,避免this出错,也可以使用bind
fromEventPattern(
  egghead.addListener.bind(egghead),
  egghead.removeListener.bind(egghead)
).subscribe(console.log);
