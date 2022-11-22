/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-22 13:19:03
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-22 13:45:19
 * @FilePath: \angular-test\src\app\store\selectors\counter.selectors.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';
import { counterFeatureKey, State } from '../reducers/counter.reducer';

// Appstate是类型，State是当前获取的类型
// 外层数据
export const selectCounter = createFeatureSelector<AppState, State>(
  counterFeatureKey
)

// 内层数据
export const selectCount = createSelector(selectCounter, state => state.count)
