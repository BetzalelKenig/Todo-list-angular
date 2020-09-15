import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: string;
  // index = this.todo.id;
  // @ViewChild('main', {static: false}) main: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  color() {
    return new Date() > new Date(this.todo.due)
      ? '5px red dotted'
      : '5px green dotted';
  }

  done() {
    return this.todo.done ? 'line-through' : 'none';
  }
}
