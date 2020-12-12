import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployeeLogin } from 'src/app/models/IEmployeeLogin';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-employee-login-form',
  templateUrl: './employee-login-form.component.html',
  styleUrls: ['./employee-login-form.component.css']
})
export class EmployeeLoginFormComponent implements OnInit {

  user: FormGroup
  @Output() public childErrorEvent = new EventEmitter()

  constructor(
    private router:Router,
    private loginService: LoginServiceService,
    private cookieService : CookieService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      username: new FormControl('', [Validators.required]),
      organization_id: new FormControl('', [Validators.required]),
      password : new FormControl('',[Validators.required]),
    });
  }

  onSubmit(user) {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    let emp : IEmployeeLogin = {
      email : user.value.username,
      org_id : user.value.organization_id,
      password : user.value.password
    }
    console.log(user)

    this.loginService.postEmployeeLogin(emp).subscribe(
      data => {
        if(data.error_msg == "true")
        {
          this.childErrorEvent.emit(data.msg)
          this.user.reset()

          this.router.navigate(['/employee/login'], { queryParams: {}})
        }
        else
        {
          this.cookieService.set("user",JSON.stringify(data.user),1,"/","localhost")
          this.cookieService.set("is_employee","true",1,"/","localhost")
          console.log(JSON.parse(this.cookieService.get("user")),"employee logged in!")
          this.router.navigate(['/employee/dashboard'])
        }
      },
      error => { console.log("Error occured while login..!!") }      
    )


  }

}
