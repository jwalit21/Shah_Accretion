import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrganizationRegistration } from '../models/IOrganizationRegistration';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class OrganizationServiceService {

  private url_organization: string = "http://localhost:8081/organization/"

  constructor(private http: HttpClient) { }

  putOrganization(org: IOrganizationRegistration): Observable<any> {
    return this.http.put<IOrganizationRegistration>(
      this.url_organization + "profile", 
      JSON.stringify(org),
      httpOptions
    )
  }

  getOrganizations(): Observable<IOrganizationRegistration[]>{
    return this.http.get<any>(this.url_organization)
  }

  deleteOrganization(org_id: number): Observable<any> {
    return this.http.delete<any>(this.url_organization + org_id)
  }

}
