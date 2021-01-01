import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrganizationRegistration } from 'src/app/models/IOrganizationRegistration';
import { RegistrationServiceService } from 'src/app/services/registration-service.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organization-registration-form',
  templateUrl: './organization-registration-form.component.html',
  styleUrls: ['./organization-registration-form.component.css']
})
export class OrganizationRegistrationFormComponent implements OnInit {

  user: FormGroup
  private id=0
  public file_name
  public file
  @Output() public childStatusEvent = new EventEmitter()
  @Output() public childErrorEvent = new EventEmitter()

  // public logo_uploader: FileUploader = new FileUploader({
  //   url: 'http://localhost:8081/logo/upload',
  //   itemAlias: 'image'
  // });

  constructor(
      private router:Router,
      private registrationService: RegistrationServiceService,
      private httpClient : HttpClient,
    ) { }

  ngOnInit(): void {

    this.user = new FormGroup({
      organization_name: new FormControl('', [Validators.required]),
      director_name: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      repeat_password : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      mobile: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      website_link: new FormControl(''),
      facebook_link: new FormControl(''),
      linkedin_link: new FormControl(''),
      instagram_link: new FormControl(''),
      logo: new FormControl(this.file_name,[Validators.required]),
    });
  }

  // pwdMatchValidator(frm: FormGroup) {
  //   return frm.get('password').value === frm.get('repaet_password').value
  //      ? null : {'mismatch': true};
  // }

  // get password() { return this.user.get('password'); }
  // get confirm_password() { return this.user.get('repeat_password'); }


  onSubmit(user) {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    let formData = new FormData();
    formData.append("file", this.file)


    let org : IOrganizationRegistration = {
      org_id: this.id, 
      organization_name: user.value.organization_name,
      director_name: user.value.director_name,
      email: user.value.email,
      password : user.value.password,
      mobile: user.value.mobile,
      website_link: user.value.website_link,
      facebook_link: user.value.facebook_link,
      linkedin_link: user.value.linkedin_link,
      instagram_link: user.value.instagram_link,
      logo: this.file
    }
    
    console.log(org)
    console.log(formData.get("file").toString())
    
    //Needed for file upload

    // this.registrationService.postFile(formData).subscribe(
    //   data => console.log("hurray"),
    //   err => console.log("oops")
    // )
    // this.httpClient.post<any>('http://localhost:8081/test_upload',formData).subscribe(
    //   (data) => console.log(data),
    //   (err) => console.log(err)
    // )

    this.registrationService.postOrganization(org)    
      .subscribe(
        data => {
          console.log(data.msg)
          if(data.error_msg == "true")
            this.childErrorEvent.emit(data.msg)            
          else
          {
            this.childStatusEvent.emit(data.msg+ " And your Organization ID is "+data.org_id)
          }
        },
        error => console.error("Error registering the organization")
      )
    this.user.reset();
  }


  //Needed for file upload
  /*
  
  */


  onFileSelect(event)
  {
    if((event.target as HTMLInputElement).files.length > 0)
    {
      this.file = (event.target as HTMLInputElement).files[0]
      // this.user.get("logo").setValue(file)
      this.file_name = "dummy"
      console.log(this.file)
    }
  }

}
