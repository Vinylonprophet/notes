import { ReplaySubject } from 'rxjs';

const rSubject = new ReplaySubject();

rSubject.subscribe((value) => {
  console.log(value);
});

rSubject.next('Vinylon');
rSubject.next('Insomnia');

setTimeout(function () {
  rSubject.subscribe({
    next: function (value) {
      console.log(value);
    },
  });
}, 3000);
