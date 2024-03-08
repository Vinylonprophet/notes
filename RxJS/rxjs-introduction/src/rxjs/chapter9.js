import { fromEvent, map, pluck } from "rxjs";

const button = document.getElementById("btn");

// fromEvent(button, "click").pipe(map(event => event.target)).subscribe(console.log)
fromEvent(button, "click").pipe(pluck("target")).subscribe(console.log)