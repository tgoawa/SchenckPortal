import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class LoginService {
  private serverUrl = 'http://webdev.schencksolutions.com:1016/';
  constructor(private http: Http) { }

  checkStatus(user: User) {
    return this.http.post(this.serverUrl + 'UserService/IsUserValid/', user)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
