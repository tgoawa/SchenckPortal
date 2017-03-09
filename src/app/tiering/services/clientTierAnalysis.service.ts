import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IClientVal } from '../models/';


@Injectable()
export class ClientTierAnalysisService {

  private baseUrl = 'http://webdev.schencksolutions.com:1016/ClientTierService/';
  private apiMethod = 'GetTierParent/';

  constructor(private http: Http) { }

   getParentValues(val: number): Promise<IClientVal> {
     return this.http.get(this.baseUrl + this.apiMethod + val)
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
