import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginHeaderComponent } from './Headers/login-header/login-header.component';
import { LoginFooterComponent } from './Footers/login-footer/login-footer.component';
import { HomeComponent } from './home/home.component';
import { OrganizationLoginComponent } from './Login/organization-login/organization-login.component';
import { OrganizationRegisterComponent } from './Login/organization-register/organization-register.component';
import { EmployeeLoginComponent } from './Login/employee-login/employee-login.component';
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Login/reset-password/reset-password.component';
import { OrganizationDashboardComponent } from './Organization/organization-dashboard/organization-dashboard.component';
import { DashboardFooterComponent } from './Footers/dashboard-footer/dashboard-footer.component';
import { DashboardHeaderComponent } from './Headers/dashboard-header/dashboard-header.component';
import { OrganizationSidebarComponent } from './Sidebars/organization-sidebar/organization-sidebar.component';
import { EmployeesListComponent } from './Organization/employees-list/employees-list.component';
import { EmployeesAddComponent } from './Organization/employees-add/employees-add.component';
import { OrganizationLoginFormComponent } from './React-Forms/organization-login-form/organization-login-form.component';
import { OrganizationRegistrationFormComponent } from './React-Forms/organization-registration-form/organization-registration-form.component';
import { EmployeeLoginFormComponent } from './React-Forms/employee-login-form/employee-login-form.component';
import { ForgotPasswordFormComponent } from './React-Forms/forgot-password-form/forgot-password-form.component';
import { ResetPasswordFormComponent } from './React-Forms/reset-password-form/reset-password-form.component';
import { EmployeeAddFormComponent } from './React-Forms/employee-add-form/employee-add-form.component';
import { ToDoAddFormComponent } from './React-Forms/to-do-add-form/to-do-add-form.component';
import { EmployeeEditFormComponent } from './React-Forms/employee-edit-form/employee-edit-form.component';
import { ToDoAddComponent } from './Organization/to-do-add/to-do-add.component';
import { ToDoListComponent } from './Organization/to-do-list/to-do-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDetailsComponent } from './Organization/employee-details/employee-details.component';
import { AccessDeniedComponent } from './Errors/access-denied/access-denied.component';
import { StickyFooterComponent } from './Footers/sticky-footer/sticky-footer.component';
import { PageNotFoundComponent } from './Errors/page-not-found/page-not-found.component';
import { EmployeeUpdateComponent } from './Organization/employee-update/employee-update.component';
import { OrganizationUpdateComponent } from './Organization/organization-update/organization-update.component';
import { OrganizationDetailsComponent } from './Organization/organization-details/organization-details.component';
import { EmployeeDashboardComponent } from './Employee/employee-dashboard/employee-dashboard.component';
import { EmployeeSidebarComponent } from './Sidebars/employee-sidebar/employee-sidebar.component';
import { TodoDetailsComponent } from './Organization/todo-details/todo-details.component';
import { TodoUpdateComponent } from './Organization/todo-update/todo-update.component';
import { EmployeeProfileUpdateComponent } from './Employee/employee-profile-update/employee-profile-update.component';
import { TodoFinishedComponent } from './Organization/todo-finished/todo-finished.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    HomeComponent,
    OrganizationLoginComponent,
    OrganizationRegisterComponent,
    EmployeeLoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    OrganizationDashboardComponent,
    DashboardFooterComponent,
    DashboardHeaderComponent,
    OrganizationSidebarComponent,
    EmployeesListComponent,
    EmployeesAddComponent,
    OrganizationLoginFormComponent,
    OrganizationRegistrationFormComponent,
    EmployeeLoginFormComponent,
    ForgotPasswordFormComponent,
    ResetPasswordFormComponent,
    EmployeeAddFormComponent,
    ToDoAddFormComponent,
    EmployeeEditFormComponent,
    ToDoAddComponent,
    ToDoListComponent,
    EmployeeDetailsComponent,
    AccessDeniedComponent,
    StickyFooterComponent,
    PageNotFoundComponent,
    EmployeeUpdateComponent,
    OrganizationUpdateComponent,
    OrganizationDetailsComponent,
    EmployeeDashboardComponent,
    EmployeeSidebarComponent,
    TodoDetailsComponent,
    TodoUpdateComponent,
    EmployeeProfileUpdateComponent,
    TodoFinishedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
