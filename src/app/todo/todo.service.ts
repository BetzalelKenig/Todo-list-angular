import { Injectable } from '@angular/core';
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

  constructor() {}

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

  markDone(id: number){
    this.todoList[id].done = !this.todoList[id].done;
  }
}
