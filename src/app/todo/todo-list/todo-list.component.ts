import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoList: Todo[];
  subscription: Subscription;

  constructor(
    private todoServices: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.todoServices.todoListChanged.subscribe(
      (todoList: Todo[]) => {
        this.todoList = todoList;
      }
    );
    this.todoList = this.todoServices.getTodoList();
  }

  onNewTodo() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTodayTodo() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth();
    const yyyy = today.getFullYear();

    // (t) => [dd, mm, yyyy] === [t.due.getDate(), t.due.getMonth(), t.due.getFullYear()]


    this.todoList = this.todoList.filter(
      (t) => dd === t.due.getDate() && mm === t.due.getMonth() && yyyy === t.due.getFullYear()
    );
  }
}
