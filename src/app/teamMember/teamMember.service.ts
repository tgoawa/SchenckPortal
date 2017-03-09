import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { TeamMember } from './';

@Injectable()
export class TeamMemberService {
  public teamMember: TeamMember;

  private url_teamMember = 'http://webdev.schencksolutions.com:1016/EmployeeService/GetEmployee/';

  constructor(private http: Http) { }

  getTeamMember(userName: string) {
    return this.http.get(this.url_teamMember + userName)
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
