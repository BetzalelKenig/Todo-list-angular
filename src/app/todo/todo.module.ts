import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing-module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { CommonModule } from '@angular/common';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

@NgModule({
  declarations: [TodoComponent, TodoListComponent, TodoItemComponent, TodoStartComponent, TodoEditComponent, TodoDetailsComponent],
  imports: [RouterModule, ReactiveFormsModule, TodoRoutingModule, CommonModule],
})
export class TodoModule {}
