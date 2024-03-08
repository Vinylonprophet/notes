// 差异

// 虽然功能很像, 但是有着很大差异
// 下面的Producer实际上是内部存储了一份所有的监听者清单, 发布通知时逐一呼叫清单的监听者
// Observable内部并不存在这么一份清单, 订阅的行为更像是执行一个方法, 并且把资料传进去
class Producer {
  listeners: any[];
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    }
  }
  removeListener(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
  notify(message) {
    this.listeners.forEach((listener) => {
      listener(message);
    });
  }
}

// 订阅一个observable就像执行一个function
// 比如下面的创建一个subscribe的function，执行时传入观察者，内部去执行方法
function subscribe(observer) {
  observer.next('Jerry');
  observer.next('Anna');
}
subscribe({
  next: function (value) {
    console.log(value);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log('complete');
  },
});
