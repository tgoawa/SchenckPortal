import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { IClientVal } from '../models/clientTierVal.model';
import '../../rxjs-operators';

@Injectable()
export class ClientTierAnalysisService {

  private baseUrl = 'http://webdev.schencksolutions.com:1016/ClientTierService/';

  constructor(private http: Http) { }

   getParentValues(val: number): Observable<IClientVal[]> {
     return this.http.get('/data/analysis-data.json')
     .map((response: Response) => response.json())
     .catch(this.handleError);
   }

   private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
   }
}
