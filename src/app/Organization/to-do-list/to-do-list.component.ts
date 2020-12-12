import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  public todos : ITodoRegistration[]
  public todos_by_organization : ITodoRegistration[]
  public todos_by_employee : ITodoRegistration[]
  public todos_finished_for_organization : ITodoRegistration[]
  public todos_finished_by_employee : ITodoRegistration[]
  public is_employee: boolean
  public user
  public current_date: string
  public todo_id: number
  public todo : ITodoRegistration

  constructor(
    private cookieService: CookieService, 
    private router: Router,
    private todoService: TodoServiceService,
    private route : ActivatedRoute,
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
          this.todos = this.todos.filter(todo => todo.finished === false)
          console.log(this.todos)

          if(this.is_employee){
            this.todos_by_employee = this.todos.filter(todo => todo.emp_username === this.user.email)
          }
          else{
            this.todos_by_organization = this.todos.filter(todo => todo.org_id === this.user.org_id)
          }

        },
        err => {
          console.log("Error while getting all the todos");
          
          if(this.is_employee)
            this.router.navigate(['/employee/dashboard'])
          this.router.navigate(['/organization/dashboard'])
        }
      )

    }
  }

  onDone(id)
  {
    console.log(id)
    this.todoService.getTodoWithId(id).subscribe(
      data => {
        console.log("Todo came for done task!")
        this.todo = data[0]

        var now = new Date();
        var day = ("0" + (now.getDate()+1)).slice(-2);
        var month = ("0" + (now.getMonth())).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);

        this.current_date = (today.toString())

        let todo_post : ITodoRegistration = {
          todo_id : this.todo.todo_id,
          emp_username : this.todo.emp_username,
          org_id : this.todo.org_id,
          title : this.todo.title,
          task: this.todo.task,
          date_of_issue : this.todo.date_of_issue,
          date_of_due : this.todo.date_of_due,
          finished : true,
          finished_date: this.current_date,
        }

        console.log(todo_post)
        this.todoService.putTodo(todo_post).subscribe(
        data => {
          console.log(data, "Todo done suceessfully!")
          this.router.navigate(['/employee/todos/list'])
        },
      error => {
        console.error("Error while making the Todo's done!")
      }
    )

      },
      err => {
        console.log("Erroe on getting todo for done task!")
      }
    )

  }

  onUpdate(id)
  {
    this.router.navigate(['/organization/todos/update/'+id.toString()])
  }

  onSelect(id)
  {
    if(this.is_employee)
      this.router.navigate(['/organization/todos/'+id])
    this.router.navigate(['/employee/todos/'+id])
  }

  onDelete(id)
  {
    console.log(id)
    this.todoService.deleteTodo(id).subscribe(
      data=> {
        console.log("todo deleted")
        this.router.navigate(['/organization/todos/list'])
      },
      err => {
        console.log("Error while deleting todo!")
      }
    )
  }

}
