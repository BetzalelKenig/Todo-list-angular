import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TodoStartComponent } from './todo-start/todo-start.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      { path: '', component: TodoStartComponent },
      { path: 'new', component: TodoEditComponent },
      {
        path: ':id',
        component: TodoDetailsComponent,
      },
      { path: ':id/edit', component: TodoEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
