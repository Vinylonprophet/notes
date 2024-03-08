/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 00:07:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-24 21:59:11
 * @FilePath: \angular-test\src\app\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCounter from './reducers/counter.reducer';
import * as fromTodo from './reducers/todo.reducer';
import * as fromRouter from '@ngrx/router-store'

// store 中存储的状态类型接口
export interface AppState {
  [fromCounter.counterFeatureKey]: fromCounter.State;
  [fromTodo.todoFeatureKey]: fromTodo.State;
  router: fromRouter.RouterReducerState
}

// 状态名字和reducer的对应关系
export const reducers: ActionReducerMap<AppState> = {
  [fromCounter.counterFeatureKey]: fromCounter.reducer,
  [fromTodo.todoFeatureKey]: fromTodo.reducer,
  router: fromRouter.routerReducer
};

// function logger(reducer: ActionReducer<AppState>): ActionReducer {
//   return function (state, action) {
//     let result = reducer(state, action)
//     console.log("最新的状态", result);
//     console.log("上一次的状态", state);
//     console.log("action", action);
//     return result
//   }
// }

// export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
