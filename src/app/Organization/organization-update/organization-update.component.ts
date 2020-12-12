import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IOrganizationRegistration } from 'src/app/models/IOrganizationRegistration';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';

@Component({
  selector: 'app-organization-update',
  templateUrl: './organization-update.component.html',
  styleUrls: ['./organization-update.component.css']
})
export class OrganizationUpdateComponent implements OnInit {

  user: FormGroup
  public error_Msg : string = ""
  public user_cookie

  constructor(
    private router:Router, 
    private cookieService : CookieService,
    private organizationService : OrganizationServiceService,
  ) { }

  ngOnInit(): void {

    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
    {
      this.router.navigate(['/access-denied'])
    }

    this.user = new FormGroup({
      organization_name: new FormControl(this.user_cookie.organization_name, [Validators.required]),
      director_name: new FormControl(this.user_cookie.director_name, [Validators.required]),
      password : new FormControl(this.user_cookie.password,[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      mobile: new FormControl(this.user_cookie.mobile,[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      website_link: new FormControl(this.user_cookie.website_link),
      facebook_link: new FormControl(this.user_cookie.facebook_link),
      linkedin_link: new FormControl(this.user_cookie.linkedin_link),
      instagram_link: new FormControl(this.user_cookie.instagram_link),
      logo: new FormControl(''),
    });

  }

  onSubmit(user)
  {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    var organization_logo

    if(user.value.logo)
      organization_logo = user.value.logo
    else
      organization_logo = this.user_cookie.logo

    let org : IOrganizationRegistration = {
      org_id: this.user_cookie.org_id, 
      organization_name: user.value.organization_name,
      director_name: user.value.director_name,
      email: this.user_cookie.email,
      password : user.value.password,
      mobile: user.value.mobile,
      website_link: user.value.website_link,
      facebook_link: user.value.facebook_link,
      linkedin_link: user.value.linkedin_link,
      instagram_link: user.value.instagram_link,
      logo: organization_logo,
    }
    
    console.log(org)
    this.organizationService.putOrganization(org).subscribe(
      data => {
        console.log(data.msg)
      },
      err => {
        console.error("Error while updating the organization data!")
      }
    )
  }

}
