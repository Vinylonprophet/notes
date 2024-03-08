/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 00:14:24
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-22 14:23:42
 * @FilePath: \angular-test\src\app\store\actions\counter.actions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAction, props } from '@ngrx/store';

// 创建action creator函数时，获取参数并指定参数类型
export const increment = createAction("increment", props<{ count: number }>());
export const decrement = createAction("decrement");
export const async_increment = createAction("async_increment")

