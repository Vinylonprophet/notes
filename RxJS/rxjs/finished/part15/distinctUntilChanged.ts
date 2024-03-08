import { from, zip, interval, distinctUntilChanged } from 'rxjs';

// distinctUntilChanged和distinct一样会把相同元素过滤,但是distinctUntilChanged只跟最后一次元素比较

zip(from(['a', 'b', 'c', 'c', 'b']), interval(300), (x, y) => x)
  .pipe(distinctUntilChanged())
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });

// 这里的distinctUntilChanged只缓存一个元素,意思就是上一个和下一个连续对比
// source : --a--b--c--c--b|
//   distinctUntilChanged()
// example: --a--b--c-----b|
// distinctUntilChanged是比较实用的方法,常见的是多方同步,有多个Client,每个Client有自己的状态,Server会在一个Client需要变动的时候通知所有Client更新,但某些Client接收到新状态和上一次相同,这时候用distinctUntilChanged只处理和最后一次不相同的讯息
