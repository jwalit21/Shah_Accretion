import { Component, OnInit } from '@angular/core';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import * as $ from 'jquery';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})

export class EmployeeUpdateComponent implements OnInit {

  user: FormGroup
  public emp_id : number
  public emp : IEmployeeRegistration
  public user_cookie
  public hasUndefined : boolean = true
  public error_Msg : string = ""

  constructor(
    private cookieService : CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService : EmployeeServiceService,
  ) { }

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

        this.user = new FormGroup({
          first_name: new FormControl(this.emp.first_name, [Validators.required]),
          last_name: new FormControl(this.emp.last_name, [Validators.required]),
          mobile: new FormControl(this.emp.mobile,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
          address: new FormControl(this.emp.address,[Validators.required]),
          dob: new FormControl(this.emp.date_of_birth,[Validators.required]),
          doj: new FormControl(this.emp.date_of_join,[Validators.required]),
          blood_group: new FormControl(this.emp.blood_group,[Validators.required]),
          photo: new FormControl(this.emp.photo),
        })

      },
      err => {
        console.log("Error while getting employee!")
      }
    ) 
  }

  onSubmit(user)
  {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    var user_photo

    if(user.value.photo)
      user_photo = user.value.photo
    else
      user_photo = this.emp.photo

    let emp : IEmployeeRegistration = {
      emp_id : this.emp.emp_id,
      org_id : this.emp.org_id,
      first_name : user.value.first_name,
      last_name : user.value.last_name,
      email : this.emp.email,
      mobile : user.value.mobile,
      password : this.emp.password,
      address : user.value.address,
      date_of_birth : user.value.dob,
      date_of_join : user.value.doj,
      blood_group : user.value.blood_group,
      photo : user_photo,
    }

    console.log(emp)
    this.employeeService.putEmployee(emp).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/organization/employees/list'])
      },
      error => {
        console.error("Error while updating the employee data!")
      }
    )

  }

}
