import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./../../css/organization_dashboard.css']
})
export class EmployeeDashboardComponent implements OnInit {

  public todos : ITodoRegistration[]

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private todoService: TodoServiceService,
  ) { }

  ngOnInit(): void {
    if(!(this.cookieService.get("user")) || this.cookieService.get("is_employee")=="false")
      this.router.navigate(['/employee/login'])
    else
      console.log("employee already logged in or just logged")

    this.todoService.getTodos().subscribe(
      data => {  
  
          this.todos = data
          this.todos = this.todos.slice(1,this.todos.length)
          this.todos = this.todos.filter(todo => todo.finished === false)
          this.todos = this.todos.filter(todo => todo.emp_username === JSON.parse(this.cookieService.get("user")).email)
  
      },
      err => {
          console.log("Error while getting all the todos")
      }
    )
  }

}
