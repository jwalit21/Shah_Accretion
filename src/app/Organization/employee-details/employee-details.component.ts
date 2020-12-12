import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public emp_id : number
  public emp : IEmployeeRegistration
  public user_cookie
  public hasUndefined : boolean = true


  constructor(
    private cookieService : CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService : EmployeeServiceService,
  ) { }  

  public hiddenClass = {
    "visible":this.hasUndefined
  }

  ngOnInit(): void {

    $('#employee_link_parent').addClass("active") //for having a sidebar link as a active

    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
      this.router.navigate(['/organization/login'])

    this.emp_id = parseInt(this.route.snapshot.paramMap.get('id'))

    if(isNaN(this.emp_id))
    {
      this.router.navigate(['/page-not-found'])
    }

    this.employeeService.getEmpWithId(this.emp_id).subscribe(
      data => {
        if(data[0]==undefined) // if user hasn't come means user not found there with given id hence it should leads to dashboard again
        {
          this.router.navigate(['/organization/dashboard'])
        }

        this.emp = data[0]
        if((this.emp!=undefined && this.emp.org_id != this.user_cookie.org_id))  // user is there but it doesnt belongs to current organization which is currently logged in
        {
          this.emp = null
          this.router.navigate(['/access-denied'])
        }

        this.hasUndefined = false // if user has came then and then the details comonent is visivlbe
        //this is class binding
      
      },
      err => {
        console.log("Error while getting employee!")
      }
    )
  }

  onUpdate(id)
  {
    this.router.navigate(['/organization/employees/update/'+id.toString()])
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
