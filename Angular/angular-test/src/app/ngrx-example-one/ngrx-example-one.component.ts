/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-24 17:09:47
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-24 21:43:51
 * @FilePath: \angular-test\src\app\ngrx-example-one\ngrx-example-one.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { filter, fromEvent, map, Observable } from 'rxjs';
import { addTodo, deleteTodo } from '../store/actions/todo.actions';
import { Todo } from '../store/reducers/todo.reducer';
import { selectTodos } from '../store/selectors/todo.selectors';


@Component({
  selector: 'app-ngrx-example-one',
  templateUrl: './ngrx-example-one.component.html',
  styleUrls: ['./ngrx-example-one.component.css']
})
export class NgrxExampleOneComponent implements OnInit, AfterViewInit {
  @ViewChild('AddTodoInput') AddTodoInput!: ElementRef

  todos: Observable<Todo[]> | undefined

  constructor(private store: Store<AppState>) {
    this.todos = this.store.pipe(select(selectTodos))
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(
      this.AddTodoInput.nativeElement, "keyup"
    ).pipe(
      filter(event => event.key === "Enter"),
      map(event => (<HTMLInputElement>event.target).value),
      map(title => title.trim()),
      filter(title => title !== "")
    ).subscribe(title => {
      this.store.dispatch(addTodo({
        title,
        id: ''
      })),
        this.AddTodoInput.nativeElement.value = ""
    })
  }

  deleteTodo(id: string){
    this.store.dispatch(deleteTodo({
      id,
      title: ''
    }))
  }

}
