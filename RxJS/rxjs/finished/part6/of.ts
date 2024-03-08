import { of } from 'rxjs';

// of是在我们想要同步传几个值的时候可以用它来简介表达
of('Jerry', 'Tom').subscribe((observer) => {
  console.log(observer);
});

of('Jerry', 'Tom').subscribe({
  next: function (value) {
    console.log(value);
  },
});
