import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFinishedComponent } from './todo-finished.component';

describe('TodoFinishedComponent', () => {
  let component: TodoFinishedComponent;
  let fixture: ComponentFixture<TodoFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
