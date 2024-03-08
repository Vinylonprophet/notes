import { empty } from 'rxjs';

// 有点类似于0,好像没什么用,但是有些时候很重要
// empty会给一个空的Observable,订阅之后立刻传出complete
empty().subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete!');
  },
  error: function (error) {
    console.log(error);
  },
});
