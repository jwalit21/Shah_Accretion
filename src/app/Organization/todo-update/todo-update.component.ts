import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import * as $ from 'jquery';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {

  user: FormGroup
  public todo_id : number
  public todo : ITodoRegistration
  public user_cookie
  public hasUndefined : boolean = true
  public error_Msg : string = ""
  public emp_username
  public current_date: string
  public employees: IEmployeeRegistration[]


  constructor(
    private cookieService : CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private todoService : TodoServiceService,
    private employeeServicce : EmployeeServiceService,

  ) { }

  ngOnInit(): void {

    $('#todos_link_parent').addClass("active") //for having a sidebar link as a active

    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
      this.router.navigate(['/organization/login'])

    this.todo_id = parseInt(this.route.snapshot.paramMap.get('id'))

    if(isNaN(this.todo_id))
    {
      this.router.navigate(['/page-not-found'])
    }

    this.todoService.getTodoWithId(this.todo_id).subscribe(
      data => {
        if(data[0]==undefined) // if user hasn't come means user not found there with given id hence it should leads to dashboard again
        {
          this.router.navigate(['/organization/dashboard'])
        }

        this.todo = data[0]
        if((this.todo != undefined && this.todo.org_id != this.user_cookie.org_id))  // user is there but it doesnt belongs to current organization which is currently logged in
        {
          this.todo = null
          this.router.navigate(['/access-denied'])
        }

        
        var now = new Date();
        var day = ("0" + (now.getDate()+1)).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);

        this.current_date = (today.toString())
        this.hasUndefined = false // if user has came then and then the details comonent is visivlbe
        //this is class binding

        this.employeeServicce.getEmployees().subscribe(
          data => {
            this.employees = data.slice(1,data.length)
          },
          err => {
            console.log("Error while getting employees id's data")
          }
        )

        this.emp_username = this.todo.emp_username,

        this.user = new FormGroup({
          emp_username: new FormControl(this.emp_username),
          title: new FormControl(this.todo.title, [Validators.required]),
          task: new FormControl(this.todo.task, [Validators.required]),
          dod: new FormControl(this.todo.date_of_due,[Validators.required])
      })

      },
      err => {
        console.log("Error while getting employee!")
      }
    )
  }

  onSubmit(user)
  {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    let todo : ITodoRegistration = {
        todo_id : this.todo.todo_id,
        emp_username : this.emp_username,
        org_id : this.todo.org_id,
        title : user.value.title,
        task: user.value.task,
        date_of_issue : this.todo.date_of_issue,
        date_of_due : user.value.dod,
        finished : false,
        finished_date : "",
    }

    console.log(todo)
    this.todoService.putTodo(todo).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/organization/todos/list'])
      },
      error => {
        console.error("Error while updating the Todo's data!")
      }
    )

  }

}
