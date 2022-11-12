import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  message: string = "Hello Angular";

  getInfo() {
    return "我是getInfo方法返回的内容"
  }

  htmlString: string = "<h1>htmlString</h1>"
}
