import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { environment } from '../../../../environments/environment';
import { IStrategyEvent } from '../models/strategyEvent.model';

@Injectable()
export class StrategyEventService {

  private environmentName = environment.envApi;
  private baseUrl = this.environmentName + 'schencksolutions.com:1016/StrategyPlanService/';

  constructor(private http: Http) { }

  createEvent(strategyEvent: IStrategyEvent) {
    return this.http.post(this.baseUrl + 'SaveStrategyEvent/', strategyEvent)
    .toPromise()
    .then((response: Response) => response.json())
    .catch(this.handleError);
  }

  updateEvent(strategyEvent: IStrategyEvent) {
    return this.http.put(this.baseUrl + 'UpdateStrategyEvent/', strategyEvent)
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
