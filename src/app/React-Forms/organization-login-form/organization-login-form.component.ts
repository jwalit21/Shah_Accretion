import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrganizationLogin } from 'src/app/models/IOrganizationLogin';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-organization-login-form',
  templateUrl: './organization-login-form.component.html',
  styleUrls: ['./organization-login-form.component.css']
})
export class OrganizationLoginFormComponent implements OnInit {

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
      username: new FormControl('', [Validators.email,Validators.required]),
      password : new FormControl('',[Validators.required]),
    });
    this.route.snapshot.paramMap.get("msg")
  }

  onSubmit(user) {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))
    let org : IOrganizationLogin = {
      email : user.value.username,
      password : user.value.password
    }
    console.log(user)

    this.loginService.postOrganizationLogin(org).subscribe(
      data => {
        if(data.error_msg == "true")
        {
          this.childErrorEvent.emit(data.msg)
          this.user.reset()
          alert("Invalid credentials");
          this.router.navigate(['/organization/login'], { queryParams: {}})
        }
        else
        {
          this.cookieService.set("user",JSON.stringify(data.user),1,"/","localhost")
          this.cookieService.set("is_employee","false",1,"/","localhost")
          console.log(JSON.parse(this.cookieService.get("user")))
          this.router.navigate(['/organization/dashboard'])
        }
      },
      error => { console.log("Error occured while login..!!") }      
    )
  }

}
