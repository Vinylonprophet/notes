import axios from "axios";
import { fromEvent, map, switchMap, from, debounceTime, distinctUntilChanged } from "rxjs";

const search = document.getElementById("search");

fromEvent(search, "keyup").pipe(
    debounceTime(1000),
    map(event => event.target.value),
    // 在map之后，因为map之前是事件对象，map之后才是字符串
    distinctUntilChanged(),
    switchMap(keyword =>
        from(
            axios.get(`https://j1sonplaceholder.typicode.com/posts?q=${keyword}`)
        )
    )
).subscribe(console.log)