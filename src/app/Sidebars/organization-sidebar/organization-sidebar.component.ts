import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-organization-sidebar',
  templateUrl: './organization-sidebar.component.html',
  styleUrls: ['./../../css/organization_dashboard.css']
})
export class OrganizationSidebarComponent implements OnInit {

  constructor(private cookieService : CookieService) { }

  public organization_name: string

  ngOnInit(): void {
    this.organization_name = JSON.parse(this.cookieService.get("user")).organization_name
    this.organization_name.slice(0,4)
    // $('.employee_link').click(function(){
    //   if($('#employee_link_parent').hasClass("active"))
    //     $('#employee_link_parent').removeClass("active")
    //   else
    //     $('#employee_link_parent').addClass("active")
    // });
  }

}
