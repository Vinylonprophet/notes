import { throwError } from 'rxjs';

// 抛出错误
throwError('Error').subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete!');
  },
  error: function (error) {
    console.log('Throw Error: ' + error);
  },
});
