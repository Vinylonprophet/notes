import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCounter from './reducers/counter.reducer';

// store 中存储的状态类型接口
export interface AppState {

  [fromCounter.counterFeatureKey]: fromCounter.State;
}

// 状态名字和reducer的对应关系
export const reducers: ActionReducerMap<AppState> = {

  [fromCounter.counterFeatureKey]: fromCounter.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
