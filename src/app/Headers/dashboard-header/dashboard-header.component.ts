import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./../../css/organization_dashboard.css']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private cookieService: CookieService, private router:Router
    ) { }

  public director_name: string
  public employee_name: string
  public is_employee : boolean

  ngOnInit(): void {
    var user = JSON.parse(this.cookieService.get("user"))   
    var condition = this.cookieService.get("is_employee")
    if(condition == "false")
    {
      this.is_employee = false
      this.director_name = user.director_name
      this.director_name = this.director_name.slice(0,6)
    }
    else
    {
      this.is_employee = true
      this.employee_name = user.first_name
      this.employee_name = this.employee_name.slice(0,6)
    }
    console.log(this.director_name,this.employee_name,this.is_employee)

  }

  OrganizationLogout(){
    var user = JSON.parse(this.cookieService.get("user"))
    if(user)
    {
      this.cookieService.delete('user','/organization','localhost')
      this.cookieService.delete('user','/organization/employees','localhost')
      this.cookieService.delete('user','/','localhost')

      this.cookieService.delete('is_employee','/employee','localhost')
      this.cookieService.delete('is_employee','/employee/todos','localhost')
      this.cookieService.delete('is_employee','/','localhost')

      this.router.navigate(['organization/login',{msg: "Logged out successfully!"}])
    }
    else
      this.router.navigate(['/organization/login'])
  }

  EmployeeLogout(){
    var user = JSON.parse(this.cookieService.get("user"))
    if(user)
    {
      this.cookieService.delete('user','/employee','localhost')
      this.cookieService.delete('user','/employee/todos','localhost')
      this.cookieService.delete('user','/','localhost')

      this.cookieService.delete('is_employee','/employee','localhost')
      this.cookieService.delete('is_employee','/employee/dashboard','localhost')
      this.cookieService.delete('is_employee','/employee/todos','localhost')
      this.cookieService.delete('is_employee','/','localhost')

      this.router.navigate(['employee/login',{msg: "Logged out successfully!"}])
    }
    else
      this.router.navigate(['/employee/login'])
  }

  OrganizationDetails()
  {
    var user = JSON.parse(this.cookieService.get("user"))
    if(user)
      this.router.navigate(['organization/profile'])
    else
      this.router.navigate(['/organization/login'])
  }

  EmployeeDetails()
  {
    var user = JSON.parse(this.cookieService.get("user"))
    if(user)
      this.router.navigate(['employee/profile'])
    else
      this.router.navigate(['/employee/login'])
  }

}
