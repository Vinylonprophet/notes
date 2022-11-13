/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-13 13:25:18
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-13 13:38:34
 * @FilePath: \angular-test\src\app\components\fault-tolerant\fault-tolerant.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';

interface Task {
  person? : {
    name: string
  }
}

@Component({
  selector: 'app-fault-tolerant',
  templateUrl: './fault-tolerant.component.html',
  styleUrls: ['./fault-tolerant.component.css']
})

export class FaultTolerantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  task: Task = {
    person: {
      name: "Vinylon"
    }
  }
}
