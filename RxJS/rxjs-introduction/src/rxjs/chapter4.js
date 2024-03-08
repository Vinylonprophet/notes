import { BehaviorSubject } from 'rxjs';

const demoBehavior = new BehaviorSubject('默认值');
demoBehavior.subscribe({
  next: function (value) {
    console.log(value);
  },
});
demoBehavior.next('Hello');
