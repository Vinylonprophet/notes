import { never } from 'rxjs';

// never会给一个无穷的observable,永远等不到他结束
never().subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});
