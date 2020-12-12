import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./../../css/main_login.css']
})
export class EmployeeLoginComponent implements OnInit {

  public error_Msg: string = ""
  public succ_Msg: string= ""
  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.succ_Msg = this.route.snapshot.paramMap.get("msg")
    this.error_Msg = ""
  }

  msgFromChildOnError(msg)
  {
    this.error_Msg = msg
    this.succ_Msg = ""
  }

}
