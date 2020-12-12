import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { IOrganizationRegistration } from '../models/IOrganizationRegistration';
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

export class RegistrationServiceService {

  private url_orgaization: string = "http://localhost:8081/organization/registration"
  private url_employees: string = "http://localhost:8081/organization/employees/add"
  private url_file_upload: string = "http://localhost:8081/file_upload"

  constructor(private http: HttpClient) { }

  postOrganization(org: IOrganizationRegistration): Observable<any> {
    return this.http.post(
      this.url_orgaization,
      JSON.stringify(org),
      httpOptions
    )
  }

  postFile(formdata : FormData): Observable<any>{
    return this.http.post(
      this.url_file_upload,
      formdata
    )
  }

  postEmployee(emp: IEmployeeRegistration): Observable<any> {
    return this.http.post(
      this.url_employees,
      JSON.stringify(emp),
      httpOptions
    )
  }

}
