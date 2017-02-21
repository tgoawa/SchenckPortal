import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IScore } from '../models/';

@Injectable()
export class ClientTierScoreService {
  billingsLookup: IScore[];

  private baseUrl = 'http://webdev.schencksolutions.com:1016/ClientTierService/';
  private billingsApi = 'getBillingsLookups';
  private realizationApi = 'getRealizationLookups';
  private multiplierApi = 'getMultiplyLookups';
  private paymentApi = 'getPaymentLookups';
  private servicesApi = 'getServiceTouchLookups';
  private tierScoreApi = 'getTierScoreLookups';
  private workTimingApi = 'getWorkTimingLookups';
  private _billingsLookup: IScore[];

  constructor(private http: Http) { }

   getBillings(): Promise<IScore[]> {
    if (this.billingsLookup === undefined) {
    return this.http.get(this.baseUrl + this.billingsApi)
    .toPromise()
    .then((response: Response) => response.json())
    .catch(this.handleError);
    }
  }

 private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
   }
}
