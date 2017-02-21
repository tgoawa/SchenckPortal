import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ClientTierScoreService } from '../services/';

@Injectable()
export class ClientScoreResolver implements Resolve<any> {
    constructor(private scoreService: ClientTierScoreService) { }

    resolve() {
        return this.scoreService.getBillings();

        // this.scoreService.serviceBillings()
        // .then(data => {
        //     this.scoreService.setBillings(data);
        // })
        // .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}