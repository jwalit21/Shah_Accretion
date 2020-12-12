import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

  public user_cookie
  public todo_id : number
  public todo : ITodoRegistration
  public is_employee : boolean
  public current_date: string


  constructor(
    private cookieService : CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private todoService : TodoServiceService,
  ) { }

  ngOnInit(): void {

    $('#todos_link_parent').addClass("active") //for having a sidebar link as a active
    
    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
      this.router.navigate(['/organization/login'])

    if(!(this.user_cookie))
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

        this.todo_id = parseInt(this.route.snapshot.paramMap.get('id'))

        if(isNaN(this.todo_id))
        {
          this.router.navigate(['/page-not-found'])
        }

        this.todoService.getTodoWithId(this.todo_id).subscribe(
          data => {
            if(data[0]==undefined) // if user hasn't come means user not found there with given id hence it should leads to dashboard again
            {
              if(this.is_employee)
                  this.router.navigate(['/employee/dashboard'])  
              this.router.navigate(['/organization/dashboard'])
            }

            this.todo = data[0]

            if(this.is_employee){
              if((this.todo != undefined && this.todo.emp_username != this.user_cookie.email))  // user is there but it doesnt belongs to current organization which is currently logged in
              {
                  this.todo = null
                  this.router.navigate(['/access-denied'])
              }
            }
            else{
              if((this.todo != undefined && this.todo.org_id != this.user_cookie.org_id))  // user is there but it doesnt belongs to current organization which is currently logged in
              {
                  this.todo = null
                  this.router.navigate(['/access-denied'])
              }
            }

          },
          err => {
              console.log("Error while getting todo details!")
          }
        )
    }

  }

  onUpdate(id)
  {
    this.router.navigate(['/organization/todos/update/'+id.toString()])
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

  onDone(id)
  {
    this.todoService.getTodoWithId(this.todo_id).subscribe(
      data => {
        console.log("Todo came for done task!")
        this.todo = data[0]
      },
      err => {
        console.log("Erroe on getting todo for done task!")
      }
    )

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
      finished_date: this.current_date

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

  }

}
