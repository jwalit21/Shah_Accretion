import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationServiceService } from 'src/app/services/registration-service.service';

@Component({
  selector: 'app-employee-add-form',
  templateUrl: './employee-add-form.component.html',
  styleUrls: ['./employee-add-form.component.css']
})
export class EmployeeAddFormComponent implements OnInit {

  user: FormGroup
  private emp_id = 0
  public user_cookie
  @Output() public childErrorEvent = new EventEmitter()

  constructor(
    private cookieService: CookieService, 
    private router: Router,
    private registrationService : RegistrationServiceService
  ) { }

  ngOnInit(): void {

    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
      this.router.navigate(['/organization/login'])

    this.user = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required]),
      mobile: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      password : new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(4)]),
      address: new FormControl('',[Validators.required]),
      dob: new FormControl('',[Validators.required]),
      doj: new FormControl('',[Validators.required]),
      blood_group: new FormControl('',[Validators.required]),
      photo: new FormControl('',[Validators.required]),
    })
  }

  onSubmit(user) {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    let emp : IEmployeeRegistration = {
      emp_id : this.emp_id,
      org_id : this.user_cookie.org_id,
      first_name : user.value.first_name,
      last_name : user.value.last_name,
      email : user.value.email,
      mobile : user.value.mobile,
      password : user.value.password,
      address : user.value.address,
      date_of_birth : user.value.dob,
      date_of_join : user.value.doj,
      blood_group : user.value.blood_group,
      photo : user.value.photo,
    }

    console.log(emp)
    this.registrationService.postEmployee(emp)    
      .subscribe(
        data => {
          console.log(data.emp)
          if(data.error_msg == "true")
            this.childErrorEvent.emit(data.msg)            
          else
          {
            var url = '/organization/employees/' + data.emp.emp_id
            this.router.navigate([url])
          }
        },
        error => console.error("Error while adding the employee!")
      )
    this.user.reset();


  }

}
