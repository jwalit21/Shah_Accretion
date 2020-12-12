import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./../../css/main_login.css']
})
export class ResetPasswordComponent implements OnInit {

  public error_Msg : string = ""
  
  constructor() { }

  ngOnInit(): void {
  
  }

  msgFromChildOnError(msg)
  {
    this.error_Msg = msg
  }

}
