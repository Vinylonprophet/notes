import axios from "axios";
import { fromEvent, concatMap, from } from "rxjs";

const button = document.getElementById("btn");

fromEvent(button, "click")
    .pipe(
        // 合并数据流，发送第一个之后拿到token再带着token发送请求
        concatMap(event => from(axios.get("http://localhost:3005/token"))),
        concatMap(token => from(axios.get("http://localhost:3005/userInfo")))
    )
    .subscribe(
        console.log
    )