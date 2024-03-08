import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title: string = "angular";

  date = new  Date();

  money: number = 12000000;

  test = {
    person: {
      name: "Vinylon",
      age: 18
    }
  }

  paragraph: string = "冰寒千古，万物尤静；心宜气静，望我独神；心神合一，气宜相随；相间若余，万变不惊；无痴无嗔，无欲无求；无舍无弃，无为无我。"
}
