import { debounceTime, debounce, from, fromEvent, map } from 'rxjs';

// 玩下来感觉debounceTime还是很有意思的
const searchInput = document.getElementById('searchInput');
const theRequestValue = document.getElementById('theRequestValue');
fromEvent(searchInput, 'input')
  .pipe(debounceTime(300))
  .pipe(map((e) => e.target.value))
  .subscribe((value) => {
    theRequestValue.textContent = value;
  });
