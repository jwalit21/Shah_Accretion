import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoAddFormComponent } from './to-do-add-form.component';

describe('ToDoAddFormComponent', () => {
  let component: ToDoAddFormComponent;
  let fixture: ComponentFixture<ToDoAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
