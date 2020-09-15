import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { v4 as uuidv4 } from 'uuid';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  id: string;
  editMode = false;
  todoForm: FormGroup;
  due = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    //  const newTodo = new Todo(

    //  )
    if (this.editMode) {
      console.log(this.todoForm.value);

      this.todoService.updateTodo(this.id, this.todoForm.value);
    } else {
      this.todoService.addTodo(this.todoForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let shortDesciption = '';
    let description = '';

    let createAt = new Date();
    let id = uuidv4();
    let done = false;

    if (this.editMode) {
      const todo = this.todoService.getTodo(this.id);
      shortDesciption = todo.shortDescription;
      description = todo.description;
      this.due = todo.due;
      createAt = todo.createAt;
      id = todo.id;
      done = todo.done;
    }

    this.todoForm = new FormGroup({
      id: new FormControl(id),
      shortDescription: new FormControl(shortDesciption, Validators.required),
      description: new FormControl(description),
      due: new FormControl(this.due),

      createAt: new FormControl(createAt),
      done: new FormControl(done),
    });
    // this.todoForm.fdue.value = due
  }
}
