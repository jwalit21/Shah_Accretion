import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-todo-finished',
  templateUrl: './todo-finished.component.html',
  styleUrls: ['./todo-finished.component.css']
})
export class TodoFinishedComponent implements OnInit {

  public todos : ITodoRegistration[]
  public todos_finished_for_organization : ITodoRegistration[]
  public todos_finished_by_employee : ITodoRegistration[]
  public is_employee: boolean
  public user

  constructor(
    private cookieService: CookieService, 
    private router: Router,
    private todoService: TodoServiceService,
  ) { }

  ngOnInit(): void {


    $('todos_link_parent').addClass("active")

    this.user = JSON.parse(this.cookieService.get("user"))

    if(!(this.user))
    {
      if(this.cookieService.get("is_employee")=="false"){
        this.router.navigate(['/organization/login'])
      }
      else{
        this.router.navigate(['/employee/login'])
      }
    }
    else
    {

      if(this.cookieService.get("is_employee")=="false"){
        this.is_employee = false
      }
      else{
        this.is_employee = true
      }

      this.todoService.getTodos().subscribe(
        data => {
          
          this.todos = data
          this.todos = this.todos.slice(1,this.todos.length)
          this.todos = this.todos.filter(todo => todo.finished === true)

          if(this.is_employee){
            this.todos_finished_by_employee = this.todos.filter(todo => todo.emp_username === this.user.email)
          }
          else{
            this.todos_finished_for_organization = this.todos.filter(todo => todo.org_id === this.user.org_id)
          }

        },
        err => {
          console.log("Error while getting all the finished todos");
          
          if(this.is_employee)
            this.router.navigate(['/employee/dashboard'])
          this.router.navigate(['/organization/dashboard'])
        }
      )
    }

  }

  onSelect(id)
  {
    if(this.is_employee)
      this.router.navigate(['/organization/todos/'+id])
    this.router.navigate(['/employee/todos/'+id])
  }

}
