import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { IOrganizationLogin } from '../models/IOrganizationLogin';
import { Observable } from 'rxjs';
import { IEmployeeLogin } from '../models/IEmployeeLogin';
import { IForgotPassword } from '../models/IForgotPassword';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  private url_organization : string = "http://localhost:8081/organization/login"
  private url_employee : string = "http://localhost:8081/employee/login"
  private url_forgot_password : string = "http://localhost:8081/forgot-password"

  constructor(private http: HttpClient) { }

  postOrganizationLogin(org: IOrganizationLogin): Observable<any> {
    return this.http.post(
      this.url_organization,
      JSON.stringify(org),
      httpOptions
    )
  }

  sendMail(forgot_password: IForgotPassword): Observable<any>{
    return this.http.post(
      this.url_forgot_password,
      JSON.stringify(forgot_password),
      httpOptions
    )
  }

  postEmployeeLogin(emp: IEmployeeLogin): Observable<any> {
    return this.http.post(
      this.url_employee,
      JSON.stringify(emp),
      httpOptions
    )
  }

}
