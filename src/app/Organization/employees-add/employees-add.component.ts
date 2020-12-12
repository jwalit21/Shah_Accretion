import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {

  public error_Msg: string = ""

  constructor(
    private cookieService: CookieService, 
    private router: Router,
    private organizationService : OrganizationServiceService
    ) { }

  ngOnInit(): void {
    $('#employee_link_parent').addClass("active")

    if(!(this.cookieService.get("user")))
      this.router.navigate(['/organization/login'])
    else
    {

    }
  }

  msgFromChildOnError(msg){
    this.error_Msg = msg
  }

}
