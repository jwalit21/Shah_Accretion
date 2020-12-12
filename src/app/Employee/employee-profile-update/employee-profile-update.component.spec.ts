import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileUpdateComponent } from './employee-profile-update.component';

describe('EmployeeProfileUpdateComponent', () => {
  let component: EmployeeProfileUpdateComponent;
  let fixture: ComponentFixture<EmployeeProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
