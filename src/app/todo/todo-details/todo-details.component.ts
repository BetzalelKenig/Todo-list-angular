import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo;
  id: string;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.todo = this.todoService.getTodo(this.id);
    });
  }

  onEditTodo() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteTodo() {
    this.todoService.deleteTodo(this.id);
    this.router.navigate(['/todoList']);
  }

  onDoneTodo(){
    this.todoService.markDone(this.id);
  }
}
