import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IForgotPassword } from 'src/app/models/IForgotPassword';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  user: FormGroup
  public token_cookie
  public forgot_password_cookie

  @Output() public childErrorEvent = new EventEmitter()

  constructor(
    private cookieService : CookieService,
    private router: Router,
    private employeeService : EmployeeServiceService,
    private organizationService : OrganizationServiceService,
  ) { }

  ngOnInit(): void {

    if(!(this.cookieService.check("token")) || !(this.cookieService.check("forgot_password")))
    {
      this.router.navigate(['/access-denied'])
    }
 
    this.token_cookie = this.cookieService.get("token")
    this.forgot_password_cookie = JSON.parse(this.cookieService.get("forgot_password"))
    console.log(this.token_cookie,this.forgot_password_cookie)

    this.user = new FormGroup({
      token: new FormControl('', [Validators.required]),
      password : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
    });
  }

  deleteCookies()
  {
    this.cookieService.delete('token','/employee','localhost')
    this.cookieService.delete('token','/orgaization','localhost')
    this.cookieService.delete('token','/','localhost')

    this.cookieService.delete('forgot_password','/employee','localhost')
    this.cookieService.delete('forgot_password','/organization','localhost')
    this.cookieService.delete('forgot_password','/','localhost')
  
  }

  onSubmit(user) {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    if(user.value.token!=this.token_cookie){
      this.user.reset()
      this.childErrorEvent.emit("Entered Token is invalid :(")
    }
    else{
      if(this.forgot_password_cookie.is_employee){
        this.forgot_password_cookie.emp.password = user.value.password
        this.employeeService.putEmployee(this.forgot_password_cookie.emp).subscribe(
          data => {
            console.log(data.msg)
            this.deleteCookies()
            this.router.navigate(['employee/login',{msg: "Password updated successfully!"}])

          },
          err => {
            console.log("Error while resetting password of the employee!")
          }
        )
      }
      else{
        this.forgot_password_cookie.org.password = user.value.password
        this.organizationService.putOrganization(this.forgot_password_cookie.org).subscribe(
          data => {
            console.log(data.msg)
            this.deleteCookies()
            this.router.navigate(['organization/login',{msg: "Password updated successfully!"}])
          },
          err => {
            console.log("Error while resetting password of the organization!")
          }
        )
      }
    }
  }

}
