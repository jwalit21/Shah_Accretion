import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeRegistration } from '../models/IEmployeeRegistration';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})


export class EmployeeServiceService {

  private url_employee: string = "http://localhost:8081/organization/employees/"

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployeeRegistration[]>{
    return this.http.get<any>(this.url_employee) 
  }

  getEmpWithId(emp_id: number): Observable<IEmployeeRegistration[]> {
    return this.http.get<any>(this.url_employee + emp_id, { observe: 'body' })
  }

  deleteEmployee(emp_id: number): Observable<any> {
    return this.http.delete<any>(this.url_employee + emp_id)
  }

  putEmployee(emp: IEmployeeRegistration): Observable<any> {
    return this.http.put<IEmployeeRegistration>(
      this.url_employee,
      JSON.stringify(emp), 
      httpOptions
    )
  }
  
}
