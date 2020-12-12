import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./../../css/organization_dashboard.css']
})
export class OrganizationDashboardComponent implements OnInit {

  public todos : ITodoRegistration[]

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private todoService: TodoServiceService,
    ) { }

  ngOnInit(): void {
    if(!(this.cookieService.get("user")))
      this.router.navigate(['/organization/login'])
    else
      console.log("user already logged in or just logged")
      
    this.todoService.getTodos().subscribe(
      data => {  

        this.todos = data
        this.todos = this.todos.slice(1,this.todos.length)
        this.todos = this.todos.filter(todo => todo.finished === false)
        this.todos = this.todos.filter(todo => todo.org_id === JSON.parse(this.cookieService.get("user")).org_id)

      },
      err => {
        console.log("Error while getting all the todos")
      }
    )
  }

}
