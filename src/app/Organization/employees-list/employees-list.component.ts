import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  public employees : IEmployeeRegistration[]
  public user

  constructor(
    private cookieService: CookieService, 
    private router: Router,
    private employeeService: EmployeeServiceService,
  ) { }

  ngOnInit(): void {
    $('#employee_link_parent').addClass("active")
    
    this.user = JSON.parse(this.cookieService.get("user"))

    if(!(this.user))
      this.router.navigate(['/organization/login'])
    else
    {

      // $(document).ready(function(){
      //   $.noConflict();
      //   $('#employee_list').dataTable();
      // });
      
      this.employeeService.getEmployees().subscribe(
        data => {
          this.employees = data
          this.employees = this.employees.slice(1,this.employees.length)
          this.employees = this.employees.filter(employee => employee.org_id === this.user.org_id)
        },
        err => {
          console.log("Error while getting all the employees");
          this.router.navigate(['/organization/dashboard'])
        }
      )
    }
  }

  onUpdate(id)
  {
    this.router.navigate(['/organization/employees/update/'+id.toString()])
  }

  onSelect(id)
  {
    this.router.navigate(['/organization/employees/'+id])
  }

  onDelete(id)
  {
    console.log(id)
    this.employeeService.deleteEmployee(id).subscribe(
      data=> {
        console.log("employee deleted")
        this.router.navigate(['/organization/employees/list'])
      },
      err => {
        console.log("Error while deleting employee!")
      }
    )
  }

}
