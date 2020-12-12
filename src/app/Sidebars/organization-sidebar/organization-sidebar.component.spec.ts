import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSidebarComponent } from './organization-sidebar.component';

describe('OrganizationSidebarComponent', () => {
  let component: OrganizationSidebarComponent;
  let fixture: ComponentFixture<OrganizationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
