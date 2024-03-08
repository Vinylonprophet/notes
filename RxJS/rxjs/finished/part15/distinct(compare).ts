import { from, zip, interval, distinct } from 'rxjs';

// 传入一个selector callback function,这个callback function会传入一个接收到的元素,并且传给我们真正希望比对的值

zip(
  from([
    { value: 'a' },
    { value: 'b' },
    { value: 'c' },
    { value: 'a' },
    { value: 'c' },
  ]),
  interval(300),
  (x, y) => x
)
  .pipe(
    distinct((x) => {
      return x.value;
    })
  )
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });

// distinct中添加了下列表达式时,输出
// (x) => {
//   return x.value;
// })
// {value: "a"}
// {value: "b"}
// {value: "c"}

// ==================== compare ====================

// distinct中不添加时,输出
// {value: "a"}
// {value: "b"}
// {value: "c"}
// {value: "a"}
// {value: "b"}
// 因为js默认对比的是记忆体位置,而不是value,所以永不相等,所以需要传入selector callback,来选择对比的值
