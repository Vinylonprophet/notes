import { of, distinctUntilChanged } from "rxjs";

// of，将参数列表作为数据流返回
of("a", "b", "c", [], true, 20, {}).subscribe(v => console.log(v))

// 操作符 distinctUntilChanged，检测是否相同，相同跳过，不相同发送
of(1, 2, 3, 3, 5, 4, 4, 8, 9).pipe(distinctUntilChanged()).subscribe(console.log)