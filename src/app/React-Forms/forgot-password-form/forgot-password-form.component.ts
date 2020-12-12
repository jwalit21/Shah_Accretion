import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { IForgotPassword } from 'src/app/models/IForgotPassword';
import { IOrganizationRegistration } from 'src/app/models/IOrganizationRegistration';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {
  
  user: FormGroup
  public employees : IEmployeeRegistration[]
  public orgs: IOrganizationRegistration[]
  public emp : IEmployeeRegistration
  public org: IOrganizationRegistration
  
  @Output() public childErrorEvent = new EventEmitter()

  constructor(
    private loginService : LoginServiceService,
    private organizationService : OrganizationServiceService,
    private employeeService : EmployeeServiceService,
    private cookieService : CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.email]),
      is_employee : new FormControl(true),
    });
  }

  onSubmit(user) {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    if(user.value.is_employee)
    {
      this.employeeService.getEmployees().subscribe(
        data => {
            this.employees = data.slice(1)
            this.employees = this.employees.filter(emp => emp.email === user.value.username)
            console.log(this.employees)
            if(this.employees.length > 0){
              this.emp = this.employees[0]
              let forgot_password : IForgotPassword = {
                org : null,
                is_employee : false,
                emp : this.emp
              }
              this.loginService.sendMail(forgot_password).subscribe(
                data => {
                  console.log(forgot_password , "Here")
                  console.log("Token is sent to username! "+ "token is "+ data.token)
                  this.cookieService.set("token",data.token,1,'/','localhost')
                  this.cookieService.set("forgot_password",JSON.stringify(forgot_password),1,'/','localhost')
                  this.router.navigate(['login/reset_password'])
                },
                err => {
                  console.log("Error while sending username!")
                }
              )
            }
            else{
              this.childErrorEvent.emit("Incorrect username..! Employee doesn't exists.")
              this.user.reset()
            }
        },
        err => {
          console.log("Error while fetching username")
        }
      )
      // this.employeeService.
    }
    else{
      console.log("uttt")
      this.organizationService.getOrganizations().subscribe(
        data => {
          this.orgs = data
          this.orgs = this.orgs.filter(org => org.email === this.user.value.username)
          if(this.orgs.length > 0){
            this.org = this.orgs[0]
            let forgot_password : IForgotPassword = {
              org : this.org,
              is_employee : false,
              emp : null
            }
            this.loginService.sendMail(forgot_password).subscribe(
              data => {
                console.log(forgot_password , "Here")
                console.log("Token is sent to username! "+ "token is "+ data.token)
                this.cookieService.set("token",data.token,1,'/','localhost')
                this.cookieService.set("forgot_password",JSON.stringify(forgot_password),1,'/','localhost')
                this.router.navigate(['login/reset_password'])
              },
              err => {
                console.log("Error while sending username!")
              }
            )
          }
          else{
            this.childErrorEvent.emit("InCorrect username..! Organization doesn't exists.")
            this.user.reset()
          }
        },
        err => {
          console.log("Error while fetching username")
        }
      )
    }

  }

}
