import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./../../css/main_login.css']
})
export class ForgotPasswordComponent implements OnInit {

  public error_Msg : string = ""
  constructor() { }

  ngOnInit(): void {

  }

  msgFromChildOnError(msg)
  {
    this.error_Msg = msg
  }

}
