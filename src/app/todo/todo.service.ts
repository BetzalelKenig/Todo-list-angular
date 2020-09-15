import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoSelected = new Subject<Todo>();
  todoListChanged = new Subject<Todo[]>();

  private todoList: Todo[] = [
    new Todo(
      '1asdfadsfd',
      'test1',
      'the todo',
      new Date('9/20/21'),
      new Date(),
      false
    ),
    new Todo(
      '134tgr4t4',
      'test2',
      'the todo',
      new Date('1/1/90'),
      new Date(),
      false
    ),
    new Todo(
      '1g4tg4ae4tryjh',
      'test3',
      'the todo',
      new Date('1/1/30'),
      new Date(),
      false
    ),
    new Todo('145hteh7u', 'test4', 'the todo', new Date(), new Date(), true),
    new Todo('14hree6u56', 'test5', 'the todo', new Date(), new Date(), false),
    new Todo('1wg5674', 'test6', 'the todo', new Date(), new Date(), false),
  ];

  constructor(private http: HttpClient) {}

  setTodoList(todoLIst: Todo[]) {
    this.todoList = todoLIst;
    this.todoListChanged.next(this.todoList.slice());
  }

  getTodoList() {
    return this.todoList.slice();
  }

  getTodo(id: string) {
    // id shud be the uuid
    console.log(this.todoList.filter((todo) => todo.id === id)[0]);

    return this.todoList.filter((todo) => todo.id === id)[0];
  }

  addTodo(todo: Todo) {
    // test
    this.addTodoServer(todo);
    this.todoList.push(todo);
    this.todoListChanged.next(this.todoList.slice());
  }

  updateTodo(id: string, newTodo: Todo) {
    this.todoList.map(
      (td, i) => (this.todoList[i] = td.id === id ? newTodo : td)
    );
    this.todoListChanged.next(this.todoList.slice());
  }

  deleteTodo(id: string) {
    this.todoList = this.todoList.filter((td) => td.id !== id);
    this.todoListChanged.next(this.todoList.slice());
  }

  markDone(id: string) {
    this.todoList.map(
      (td, i) =>
        (this.todoList[i].done =
          td.id === id ? !this.todoList[i].done : this.todoList[i].done)
    );
  }

  // fetchTodoList() {
  //   this.http
  //     .get<Todo[]>('http://localhost:8080/todo.json')
  //     .pipe(
  //       tap((todoList) => {
  //         this.setTodoList(todoList);
  //       })
  //     )
  //     .subscribe();
  // }

  fetchTodoList() {
    this.http
      .get<Todo[]>('http://localhost:8080/api?type=getTodoList')
      .pipe(
        tap((todoList) => {
          this.setTodoList(todoList);
        })
      )
      .subscribe();
  }

  // storeTodoList(){
  //   this.http.put('http://localhost:8080/api?type')
  // }

  addTodoServer(todo) {
    this.http
      .post(
        `http://localhost:8080/api?type=addTodo&newTodod=${JSON.stringify(
          todo
        )}`,
        todo
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  deleteTodoServer(id: string) {
    this.http
      .get(`http://localhost:8080/api?type=deleteTodo&id=${id}`)
      .subscribe();
  }

  updateTodoServer(id: string, newTodo: Todo) {
    this.http
      .get(
        `http://localhost:8080/api?type=updateTodo&id=${id}&newTodo=${newTodo}`
      )
      .subscribe();
  }
}
