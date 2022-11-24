/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-24 17:15:11
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-24 17:16:08
 * @FilePath: \angular-test\src\app\store\actions\todo.actions.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAction, props } from '@ngrx/store';

// 添加任务
export const addTodo = createAction('addTodo', props<{ id: string, title: string }>());

// 删除任务
export const deleteTodo = createAction('deleteTodo', props<{ id: string, title: string }>());

