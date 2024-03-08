/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-24 17:09:47
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-24 22:13:30
 * @FilePath: \angular-test\src\app\ngrx-example\ngrx-example.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store';
import { filter, fromEvent, map, Observable } from 'rxjs';
import { addTodo, deleteTodo } from '../store/actions/todo.actions';
import { Todo } from '../store/reducers/todo.reducer';
import { selectTodos } from '../store/selectors/todo.selectors';
import { selectCurrentRoute } from '../store/selectors/router.selectors';


@Component({
  selector: 'app-ngrx-example',
  templateUrl: './ngrx-example.component.html',
  styleUrls: ['./ngrx-example.component.css']
})
export class NgrxExampleComponent implements OnInit, AfterViewInit {
  @ViewChild('AddTodoInput') AddTodoInput!: ElementRef

  todos: Observable<Todo[]> | undefined

  constructor(private store: Store<AppState>) {
    this.todos = this.store.pipe(select(selectTodos))
    this.store.pipe(select(selectCurrentRoute)).subscribe(console.log)
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
