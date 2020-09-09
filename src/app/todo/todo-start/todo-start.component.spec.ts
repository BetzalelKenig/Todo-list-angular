import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStartComponent } from './todo-start.component';

describe('TodoStartComponent', () => {
  let component: TodoStartComponent;
  let fixture: ComponentFixture<TodoStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
