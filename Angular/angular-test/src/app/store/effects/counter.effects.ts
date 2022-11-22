/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 14:42:25
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-22 14:52:38
 * @FilePath: \angular-test\src\app\store\effects\counter.effects.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, timer } from 'rxjs';
import { async_increment, increment } from '../actions/counter.actions';

@Injectable()
export class CounterEffects {

  constructor(private actions$: Actions) {
    this.async_increment_effect.subscribe(console.log)
  }

  async_increment_effect = createEffect(() => {
    return this.actions$.pipe(
      // 找到处理的action
      ofType(async_increment),
      mergeMap(() => timer(2000).pipe(
        map(() => increment({ count: 10 }))
      ))
    )
  })
}
