import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ClientTierList } from '../models/clientTierList.model';


@Injectable()
export class ClientTierListService {

    private baseUrl = 'http://webdev.schencksolutions.com:1016/ClientTierService/';

    constructor(private http: Http) {}

    searchClientTierList(val): Promise<ClientTierList[]> {
        return this.http.get(this.baseUrl + 'getParentTiers/' + val)
        .toPromise()
        .then((response: Response) => response.json())
        .catch(this.handleError);
    }

    getCurrentPeriod() {
        return this.http.get(this.baseUrl + 'getCurrentPeriod/')
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
