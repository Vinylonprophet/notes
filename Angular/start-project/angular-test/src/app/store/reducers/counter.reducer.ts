/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 10:39:47
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-22 14:24:04
 * @FilePath: \angular-test\src\app\store\reducers\counter.reducer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Action, createReducer, on } from '@ngrx/store';
import { decrement, increment } from '../actions/counter.actions';

// 状态名称
export const counterFeatureKey = 'counter';

// 状态类型接口
export interface State {
  count: number
}

// 初始状态
export const initialState: State = {
  count: 0
};

// 创建reducer函数
export const reducer = createReducer(
  initialState,
  on(increment, (state, action) => ({
    // 原来的状态
    ...state,
    // 通过action对象获取参数
    count: state.count + action.count
  })),
  on(decrement, (state) => ({
    ...state,
    count: state.count - 1
  }))
);
