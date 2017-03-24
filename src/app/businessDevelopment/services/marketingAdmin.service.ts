import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { environment } from '../../../environments/environment';

import { TeamMember } from '../../teamMember/';
import { IMentor, MentorDTO } from '../models/';



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

  getMentorshipList(mentorId: number): Promise<IMentor[]> {
    return this.http.get(this.baseUrl + 'getMentorshipList/' + mentorId)
    .toPromise()
    .then((response: Response) => response.json())
    .catch(this.handleError);
  }

  createMentorship(mentorship: MentorDTO) {
    return this.http.post(this.baseUrl + 'SaveMentorRelationship/', mentorship)
    .toPromise()
    .then((response: Response) => response.json())
    .catch(this.handleError);
  }

  deleteMentorship(mentorshipId) {
    return this.http.get(this.baseUrl + 'RemoveMentorship/' + mentorshipId)
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
