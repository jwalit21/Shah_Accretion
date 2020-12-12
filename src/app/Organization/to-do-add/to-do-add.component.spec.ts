import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoAddComponent } from './to-do-add.component';

describe('ToDoAddComponent', () => {
  let component: ToDoAddComponent;
  let fixture: ComponentFixture<ToDoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
