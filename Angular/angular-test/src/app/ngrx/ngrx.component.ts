/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 11:07:06
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-22 11:43:46
 * @FilePath: \angular-test\src\app\ngrx\ngrx.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs';
import { AppState } from '../store';
import { decrement, increment } from '../store/actions/counter.actions';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.css']
})
export class NgrxComponent implements OnInit {
  counter: Observable<{count: number}>

  constructor(private store: Store<AppState>) {
    this.counter = this.store.pipe(select("counter"))
  }

  increment(){
    this.store.dispatch(increment())
  }

  decrement(){
    this.store.dispatch(decrement())
  }

  ngOnInit(): void {
  }

}
