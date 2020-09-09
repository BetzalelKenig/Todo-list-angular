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
    new Todo('1', 'test1', 'the todo', new Date('9/20/21'), new Date(), false),
    new Todo('1', 'test2', 'the todo', new Date('1/1/90'), new Date(), false),
    new Todo('1', 'test3', 'the todo', new Date('1/1/30'), new Date(), false),
    new Todo('1', 'test4', 'the todo', new Date(), new Date(), true),
    new Todo('1', 'test5', 'the todo', new Date(), new Date(), false),
    new Todo('1', 'test6', 'the todo', new Date(), new Date(), false),
  ];

  constructor(private http: HttpClient) {}

  setTodoList(todoLIst: Todo[]) {
    this.todoList = todoLIst;
    this.todoListChanged.next(this.todoList.slice());
  }

  getTodoList() {
    return this.todoList.slice();
  }

  getTodo(id: number) {
    // id shud be the uuid
    return this.todoList[id];
  }

  addTodo(todo: Todo) {
    this.todoList.push(todo);
    this.todoListChanged.next(this.todoList.slice());
  }

  updateTodo(id: number, newTodo: Todo) {
    this.todoList[id] = newTodo;
    this.todoListChanged.next(this.todoList.slice());
  }

  deleteTodo(id: number) {
    this.todoList.splice(id, 1);
    this.todoListChanged.next(this.todoList.slice());
  }

  markDone(id: number) {
    this.todoList[id].done = !this.todoList[id].done;
  }

  fetchTodoList() {
    this.http.get<Todo[]>(
      'http://localhost:8080/todo.json'
    ).pipe(
      tap((todoList) => {
        this.setTodoList(todoList)
      })
    ).subscribe();
  }
}
