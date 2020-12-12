import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddFormComponent } from './employee-add-form.component';

describe('EmployeeAddFormComponent', () => {
  let component: EmployeeAddFormComponent;
  let fixture: ComponentFixture<EmployeeAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
