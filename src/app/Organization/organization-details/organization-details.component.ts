import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
import { IOrganizationRegistration } from 'src/app/models/IOrganizationRegistration';
import { OrganizationServiceService } from 'src/app/services/organization-service.service';


@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css']
})
export class OrganizationDetailsComponent implements OnInit {

  public org_id : number
  public org : IOrganizationRegistration
  public user_cookie

  constructor(
    private cookieService : CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private organizationService : OrganizationServiceService,
  ) { }

  ngOnInit(): void {
    $('#profile_link_parent').addClass("active") //for having a sidebar link as a active
    
    this.user_cookie = JSON.parse(this.cookieService.get("user")) 
    if(!(this.user_cookie))
    {
      this.org = null
      this.router.navigate(['/access-denied'])
    }

    this.org = this.user_cookie

  }

  onUpdate(id)
  {
    this.router.navigate(['/organization/profile/update/'+id.toString()])
  }

  onDelete(id)
  {
    console.log(id)
    this.organizationService.deleteOrganization(id).subscribe(
      data=> {
        console.log(data.msg)
        this.router.navigate(['/home'])
      },
      err => {
        console.log("Error while deleting account of organization!")
        this.router.navigate(['/organization/employees/'+id])
      }
    )
  }

}
