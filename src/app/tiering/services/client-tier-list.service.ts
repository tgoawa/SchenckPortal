import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ClientTierList } from '../models/clientTierList.model';
import '../../rxjs-operators';

@Injectable()
export class ClientTierListService {
    clientTierList: Observable<ClientTierList[]>;
    currentPeriod: Observable<any>;

    private _clientTierList: BehaviorSubject<ClientTierList[]>;
    private _currentPeriod: BehaviorSubject<any[]>;
    private dataStore: {
        clientTierList: ClientTierList[];
        currentPeriod: any;
    };

    private baseUrl = 'http://webdev.schencksolutions.com:1016/ClientTierService/';
    constructor(private http: Http) {
        this.dataStore = { clientTierList: [], currentPeriod: {} };
        this._clientTierList = <BehaviorSubject<ClientTierList[]>>new BehaviorSubject([]);
        this._currentPeriod = <BehaviorSubject<any>>new BehaviorSubject({});
        this.clientTierList = this._clientTierList.asObservable();
        this.currentPeriod = this._currentPeriod.asObservable();
    }

    searchClientTierList(val) {
        this.http.get(this.baseUrl + 'getParentTiers/' + val)
        .map((response: Response) => response.json())
        .subscribe(data => {
            this.dataStore.clientTierList = data;
            this._clientTierList.next(Object.assign({}, this.dataStore).clientTierList);
        }, error => alert('Could not retrieve client data'));
    }

    getCurrentPeriod() {
       this.http.get(this.baseUrl + 'getCurrentPeriod/')
        .map((response: Response) => response.json())
        .subscribe(data => {
            this.dataStore.currentPeriod = data;
            this._currentPeriod.next(Object.assign({}, this.dataStore).currentPeriod);
        }, error => alert('Could not get current period'));
    }

}
