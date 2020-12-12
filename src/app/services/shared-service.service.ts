import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  userData;
  constructor() { 
    this.userData = {};
  }

  setUserData(value: object)
  {
    this.userData = value
  }
  getUserData()
  {
    return this.userData
  }

  

}
