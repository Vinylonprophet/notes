/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-24 22:01:05
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-24 22:06:54
 * @FilePath: \angular-test\src\app\store\selectors\router.selectors.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';

const selectRouter = createFeatureSelector<AppState, RouterReducerState>("router")

export const {
  // 获取和当前路由相关的信息（路由参数、路由配置等）
  selectCurrentRoute,
  // 获取地址栏中 # 号后面的内容
  selectFragment,
  // 获取路由查询参数
  selectQueryParams,
  // 获取具体的某一个查询参数 selectQueryParam('name')
  selectQueryParam,
  // 获取动态路由参数
  selectRouteParams,
  // 获取某一个具体的动态路由参数，selectRouteParam('name')
  selectRouteParam,
  // 获取路由自定义数据
  selectRouteData,
  // 获取路由的实际访问地址
  selectUrl
} = getSelectors(selectRouter)
