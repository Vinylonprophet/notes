import { interval } from 'rxjs';

// interval持续方出一个数
interval(1000).subscribe({
  next: function (value) {
    console.log(value);
  },
});
