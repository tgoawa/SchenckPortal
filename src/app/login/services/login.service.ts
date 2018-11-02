import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../models/user';
import { environment } from 'environments/environment';
const api = environment.envApi;

@Injectable()
export class LoginService {
  constructor(private http: Http) { }

  checkStatus(user: User) {
    return this.http.post(api + 'UserService/IsUserValid/', user)
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
