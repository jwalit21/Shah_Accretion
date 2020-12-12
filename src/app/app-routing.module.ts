import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeLoginComponent } from './Login/employee-login/employee-login.component';
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { OrganizationLoginComponent } from './Login/organization-login/organization-login.component';
import { OrganizationRegisterComponent } from './Login/organization-register/organization-register.component';
import { ResetPasswordComponent } from './Login/reset-password/reset-password.component';
import { OrganizationDashboardComponent } from './Organization/organization-dashboard/organization-dashboard.component';
import { EmployeesListComponent } from './Organization/employees-list/employees-list.component';
import { EmployeesAddComponent } from './Organization/employees-add/employees-add.component';
import { ToDoAddComponent } from './Organization/to-do-add/to-do-add.component';
import { ToDoListComponent } from './Organization/to-do-list/to-do-list.component';
import { EmployeeDetailsComponent } from './Organization/employee-details/employee-details.component';
import { AccessDeniedComponent } from './Errors/access-denied/access-denied.component';
import { PageNotFoundComponent } from './Errors/page-not-found/page-not-found.component';
import { EmployeeUpdateComponent } from './Organization/employee-update/employee-update.component';
import { OrganizationUpdateComponent } from './Organization/organization-update/organization-update.component';
import { OrganizationDetailsComponent } from './Organization/organization-details/organization-details.component';
import { EmployeeDashboardComponent } from './Employee/employee-dashboard/employee-dashboard.component';
import { TodoDetailsComponent } from './Organization/todo-details/todo-details.component';
import { TodoUpdateComponent } from './Organization/todo-update/todo-update.component';
import { EmployeeProfileUpdateComponent } from './Employee/employee-profile-update/employee-profile-update.component';
import { TodoFinishedComponent } from './Organization/todo-finished/todo-finished.component';
//these are the set of the paths
const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'organization/login',component:OrganizationLoginComponent},
  {path:'organization/register',component:OrganizationRegisterComponent},
  {path:'employee/login',component:EmployeeLoginComponent},
  {path:'login/forgot_password',component:ForgotPasswordComponent},
  {path:'login/reset_password',component:ResetPasswordComponent},

  {path:'organization/dashboard',component:OrganizationDashboardComponent},
  {path:'organization/employees/add',component:EmployeesAddComponent},
  {path:'organization/employees/update/:id',component: EmployeeUpdateComponent},
  {path:'organization/employees/list',component:EmployeesListComponent},
  {path:'organization/employees/:id', component:EmployeeDetailsComponent},
  {path:'organization/profile',component: OrganizationDetailsComponent},
  {path:'organization/profile/update/:id',component:OrganizationUpdateComponent},
  {path:'organization/todos/add',component:ToDoAddComponent},
  {path:'organization/todos/list',component:ToDoListComponent},
  {path:'organization/todos/finished',component:TodoFinishedComponent},
  {path:'organization/todos/:id',component:TodoDetailsComponent},
  {path:'organization/todos/update/:id',component:TodoUpdateComponent},

  {path:'employee/dashboard',component:EmployeeDashboardComponent},
  {path:'employee/todos/list',component:ToDoListComponent},
  {path:'employee/todos/finished',component:TodoFinishedComponent},
  {path:'employee/todos/:id',component:TodoDetailsComponent},
  {path:'employee/profile',component:EmployeeProfileUpdateComponent},

  {path:'access-denied',component:AccessDeniedComponent},
  {path:'page-not-found',component:PageNotFoundComponent},
  {path:'**',component:PageNotFoundComponent},
  // {
  //   path: 'organization',
  //   component: DashboardComponent,
  //   children:[
  //     {
  //       path: 'list',
  //       component: ForgotPasswordComponent,
  //       outlet:'or'
  //     },
  //     {
  //       path: 'add',
  //       component: DashboardComponent,
  //       outlet:'or'
  //     }
  //   ]
  // },

  // {path:'add',component:DashboardComponent,outlet:'or'},
  // {path:'list',component:DashboardComponent,outlet:'or'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
