import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployeeRegistration } from 'src/app/models/IEmployeeRegistration';
import { ITodoRegistration } from 'src/app/models/ITodoRegistration';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-to-do-add-form',
  templateUrl: './to-do-add-form.component.html',
  styleUrls: ['./to-do-add-form.component.css']
})
export class ToDoAddFormComponent implements OnInit {

  user: FormGroup
  public user_cookie
  public emp_username
  public current_date: string
  @Output() public childErrorEvent = new EventEmitter()
  public employees: IEmployeeRegistration[]
  public finished : boolean = false;

  constructor(
    private cookieService: CookieService, 
    private router: Router,
    private todoService : TodoServiceService,
    private employeeServicce : EmployeeServiceService,
  ) { }

  ngOnInit(): void {
    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
      this.router.navigate(['/organization/login'])
    
    var now = new Date();
    var day = ("0" + (now.getDate()+1)).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    this.current_date = (today.toString())

    this.employeeServicce.getEmployees().subscribe(
      data => {
        this.employees = data.slice(1,data.length)
        this.employees = this.employees.filter(emp => emp.org_id === this.user_cookie.org_id)
        if(this.employees.length <= 0)
        {
          console.log("Not enough employees..!add employee first")
          this.router.navigate(['/organization/dashboard'])
        }

        this.emp_username = this.employees[0].email
      },
      err => {
        console.log("Error while getting employees id's data")
      }
    )

    this.user = new FormGroup({
        emp_username: new FormControl(this.emp_username),
        title: new FormControl('', [Validators.required]),
        task: new FormControl('', [Validators.required]),
        dod: new FormControl('',[Validators.required])
    })
  }

  onSubmit(user)
  {
    console.log(user.value)
    console.log(user.valid)
    console.log(JSON.stringify(user.value))

    let todo : ITodoRegistration = {
      todo_id : 0,
      emp_username : this.emp_username,
      org_id : this.user_cookie.org_id,
      title : user.value.title,
      task: user.value.task,
      date_of_issue : this.current_date,
      date_of_due : user.value.dod,
      finished : this.finished,
      finished_date: "",
    }
    
    console.log(todo)
    this.todoService.postTodo(todo).subscribe(
      data => {
        console.log("Todo added!")
        this.router.navigate(['organization/todos/'+data.todo.todo_id])
      },
      err => {
        console.log("Error occured while adding Todo")
      }
    )
  }

}
