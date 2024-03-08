/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 11:07:06
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-22 14:44:28
 * @FilePath: \angular-test\src\app\ngrx\ngrx.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs';
import { AppState } from '../store';
import { async_increment, decrement, increment } from '../store/actions/counter.actions';
import { selectCount } from '../store/selectors/counter.selectors';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.css']
})
export class NgrxComponent implements OnInit {
  count: Observable<number>

  constructor(private store: Store<AppState>) {
    this.count = this.store.pipe(select(selectCount))
  }

  increment() {
    // 使用dispatch触发action时传递参数
    this.store.dispatch(increment({ count: 5 }))
  }

  decrement() {
    this.store.dispatch(decrement())
  }

  async_increment(){
    this.store.dispatch(async_increment())
  }

  ngOnInit(): void {
  }

}
