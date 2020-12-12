import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoRegistration } from '../models/ITodoRegistration';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TodoServiceService {

  private url_todo: string = "http://localhost:8081/todos/"
  // private url_todo_employee: string = "http://localhost:8081/employee/todos/"
  constructor(private http: HttpClient) { }
  
  getTodos(): Observable<ITodoRegistration[]>{
    return this.http.get<any>(this.url_todo) 
  }

  deleteTodo(todo_id: number): Observable<any> {
    return this.http.delete<any>(this.url_todo + todo_id)
  }

  doneTodo(todo_id: number): Observable<any> {
    return this.http.get<any>(this.url_todo + todo_id)
  }

  postTodo(todo: ITodoRegistration): Observable<any> {
    return this.http.post(
      this.url_todo,
      JSON.stringify(todo),
      httpOptions
    )
  }

  getTodoWithId(todo_id: number): Observable<ITodoRegistration[]> {
    return this.http.get<any>(this.url_todo + todo_id, { observe: 'body' })
  } 

  putTodo(todo: ITodoRegistration): Observable<any> {
    return this.http.put<ITodoRegistration>(
      this.url_todo,
      JSON.stringify(todo), 
      httpOptions
    )
  }

}
