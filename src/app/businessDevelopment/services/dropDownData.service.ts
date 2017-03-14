import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { environment } from '../../../environments/environment';

import { KnownAsModel } from '../models/';

@Injectable()
export class DropDownDataService {

  private environmentName = environment.envApi;
  private baseUrl = this.environmentName + 'schencksolutions.com:1016/StrategyPlanService/';

  constructor(private http: Http) { }

  getKnownAs(): Promise<KnownAsModel[]> {
    return this.http.get(this.baseUrl + 'getKnownAsLookups/')
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
