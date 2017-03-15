import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { environment } from '../../../environments/environment';
import { IStrategyPlan } from '../models/';


@Injectable()
export class StrategyPlanService {

  private environmentName = environment.envApi;
  private baseUrl = this.environmentName + 'schencksolutions.com:1016/StrategyPlanService/';

  constructor(private http: Http) { }

  createPlan(strategyPlan: IStrategyPlan) {

    return this.http.post(this.baseUrl + 'SaveStrategyPlanHeader/', strategyPlan)
      .toPromise()
      .then((response: Response) => response.json())
      .catch(this.handleError);
  }

  getPlan(teamMemberId: number): Promise<IStrategyPlan> {

    return this.http.get(this.baseUrl + 'GetCurrentPlanHeader/' + teamMemberId)
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
