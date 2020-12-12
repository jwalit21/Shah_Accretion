import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoginFormComponent } from './employee-login-form.component';

describe('EmployeeLoginFormComponent', () => {
  let component: EmployeeLoginFormComponent;
  let fixture: ComponentFixture<EmployeeLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
