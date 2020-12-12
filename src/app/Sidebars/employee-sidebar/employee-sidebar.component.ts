import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-employee-sidebar',
  templateUrl: './employee-sidebar.component.html',
  styleUrls: ['./../../css/organization_dashboard.css']
})
export class EmployeeSidebarComponent implements OnInit {

  public employee_name: string
  constructor(private cookieService : CookieService) { }

  ngOnInit(): void {
    this.employee_name = JSON.parse(this.cookieService.get("user")).first_name
    this.employee_name.slice(0,4)
  }

}
