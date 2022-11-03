/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-02 00:57:36
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-03 16:02:20
 * @FilePath: \angular-test\src\app\app.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

interface Task {
  personF?: {
    name: String
  },
  personM?: {
    name: String
  }
}

interface List{
  id: number;
  name: string;
  age: number;
}

@Component({
  // 指定组件的使用方式，当前为标记形式
  // app-root   => <app-root></app-root>
  // [app-root] => <div app-root></div>
  // .app-root  => <div class="app-root"></div>
  selector: 'app-root',
  // 关联组件模板文件
  // templateUrl: '组件模板文件路径'
  // template: `组件模板字符串`
  templateUrl: './app.component.html',
  // 关联组件样式文件
  // styleUrls: ['组件样式文件路径']
  // styles: [`组件样式`]
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild("paragraph") paragraph: ElementRef<HTMLParagraphElement> | undefined
  @ViewChildren("items") items: QueryList<HTMLLIElement> | undefined

  username: string = "";

  date = new Date();
  money = 345343;
  test = {
    person: {
      name: "张三",
      age: 20
    }
  }

  title = 'angular-test';
  message: string = "Hello angular";
  htmlString: string = "<h1>htmlString</h1>";
  getInfo() {
    return "此处是getInfo返回的方法";
  }

  list: List[]=[
    {
      id: 1,
      name: "张三",
      age: 20
    },
    {
      id: 2,
      name: "李四",
      age: 30
    },
    {
      id: 3,
      name: "王五",
      age: 25
    },
    {
      id: 4,
      name: "赵六",
      age: 16
    }
  ]

  task : Task={
    personM: {
      name: "Vinylon"
    },
    personF: {
      name: "Melody"
    }
  }

  imgUrl = "../favicon.ico";


  onClick(event: Event) {
    console.log("看看是不是事件对象：", event)
    console.log("指向:", this);
  }

  onClickBtn(button: HTMLButtonElement): void {
    console.log(button);
  }

  onKeyup() {
    alert("keyup");
    console.log("指向:", this);
  }

  setData() {
    this.username = "Hello Angular";
  }

  getData() {
    console.log(this.username);
  }

  identify(index: number, item: List){
    console.log(index);
    console.log(item);
    return item.id
  }

  ngAfterViewInit(): void {
    console.log(this.paragraph?.nativeElement);
    console.log(this.items?.toArray());
    this.items?.toArray().forEach(item => {
      console.log(item);
    });
  }

  longParagraph = "大道无形，生育天地；大道无情，运行日月；大道无名，长养万物；吾不知其名，强名曰道。夫道者：有清有浊，有动有静；天清地浊，天动地静。男清女浊，男动女静。降本流末，而生万物。清者浊之源，动者静之基。人能常清静，天地悉皆归"
}
