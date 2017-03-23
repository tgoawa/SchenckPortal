import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { environment } from '../../../environments/environment';

import { TeamMember } from '../../teamMember/';



@Injectable()
export class MarketingAdminService {

  private environmentName = environment.envApi;
  private baseUrl = this.environmentName + 'schencksolutions.com:1016/EmployeeService/';

  constructor(private http: Http) { }

  getActiveTeamMembers(): Promise<TeamMember[]> {
    return this.http.get(this.baseUrl + 'getActiveTeamMembers/')
    .toPromise()
    .then((response: Response) => response.json())
    .catch(this.handleError);
  }

  getMentors(): Promise<TeamMember[]> {
    return this.http.get(this.baseUrl + 'GetTeamMemberMentors/')
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
