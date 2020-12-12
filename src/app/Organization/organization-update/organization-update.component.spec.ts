import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUpdateComponent } from './organization-update.component';

describe('OrganizationUpdateComponent', () => {
  let component: OrganizationUpdateComponent;
  let fixture: ComponentFixture<OrganizationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
