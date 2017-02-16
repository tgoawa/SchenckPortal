import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IClientVal } from '../models/clientTierVal.model';
import '../../rxjs-operators';

@Injectable()
export class ClientTierAnalysisService {
  currentTierValues: Observable<IClientVal[]>;

  private _currentTierValues: BehaviorSubject<IClientVal[]>;
  private dataStore: {
    currentTierValues: IClientVal[];
  };

  private baseUrl = 'http://webdev.schencksolutions.com:1016/ClientTierService/';

  constructor(private http: Http) {
      this.dataStore = { currentTierValues: []};
      this._currentTierValues = <BehaviorSubject<IClientVal[]>>new BehaviorSubject([]);
      this.currentTierValues = this._currentTierValues.asObservable();
   }

   getParentValues(val: number) {
     this.http.get(this.baseUrl + '/' + val)
     .map((response: Response) => response.json())
     .subscribe(data => {
       this.dataStore.currentTierValues = data;
       this._currentTierValues.next(Object.assign({}, this.dataStore).currentTierValues);
     }, error => alert('Could not retrieve analysis data'));
   }

}
