import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationLoginFormComponent } from './organization-login-form.component';

describe('OrganizationLoginFormComponent', () => {
  let component: OrganizationLoginFormComponent;
  let fixture: ComponentFixture<OrganizationLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
