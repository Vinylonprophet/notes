/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-24 17:17:32
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-24 21:42:10
 * @FilePath: \angular-test\src\app\store\reducers\todo.reducer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { retry } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, deleteTodo } from '../actions/todo.actions';


export const todoFeatureKey = 'todo';

export interface Todo {
  id: string,
  title: string
}

export interface State extends EntityState<Todo>{}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>()

export const initialState: State = adapter.getInitialState()

console.log(initialState)

export const reducer = createReducer(
  initialState,
  on(addTodo, (state, action) => adapter.addOne({id: uuidv4(), title: action.title}, state)),
  on(deleteTodo, (state, action) => adapter.removeOne(action.id, state))
);
