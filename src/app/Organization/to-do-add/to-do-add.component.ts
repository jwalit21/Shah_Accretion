import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-to-do-add',
  templateUrl: './to-do-add.component.html',
  styleUrls: ['./to-do-add.component.css']
})
export class ToDoAddComponent implements OnInit {

  public error_Msg: string = ""

  constructor(
    private cookieService: CookieService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    $('#todos_link_parent').addClass("active")
    if(!(this.cookieService.get("user")))
    {
      if(this.cookieService.get("is_employee") == "true")
        this.router.navigate(['/employee/login'])
      this.router.navigate(['/organization/login'])
    }
    else
    {

    }
  }

  msgFromChildOnError(msg){
    this.error_Msg = msg
  }

}