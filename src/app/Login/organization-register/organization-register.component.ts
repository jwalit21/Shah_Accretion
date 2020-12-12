import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./../../css/main_login.css']
})
export class OrganizationRegisterComponent implements OnInit {

  public status_Msg: string = ""
  public error_Msg: string = ""
 
  constructor() { }

  ngOnInit(): void {
  }

  msgFromChildOnStatus(msg){
    this.status_Msg = msg
  }

  msgFromChildOnError(msg){
    this.error_Msg = msg
  }

}
