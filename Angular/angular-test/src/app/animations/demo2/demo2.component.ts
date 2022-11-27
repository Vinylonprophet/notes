import { Component, OnInit } from '@angular/core';
import { collapsedExpanded } from '../animations';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css'],
  animations: [
    collapsedExpanded,
  ]
})
export class Demo2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isExpended: boolean = false
  toggle() {
    this.isExpended = !this.isExpended
  }

}
