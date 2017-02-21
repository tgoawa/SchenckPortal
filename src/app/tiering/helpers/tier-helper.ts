import { Injectable } from '@angular/core';

import { IScore, IClientVal } from '../models/';
import { Tiering } from '../models/tiering.model';
import { BillingsHelper } from './';
import { ClientTierScoreService } from '../services';

@Injectable()
export class TierHelper {

    constructor( private service: ClientTierScoreService) { }

    getTierScore(displayScore: IClientVal, billings: IScore[]): Tiering {
      let tier = new Tiering();
      tier.BillingScore = this.getBillings(displayScore.Billings, billings);
       return tier;
    }

   private getBillings(val: number, range): IScore {
        let bill = new BillingsHelper(this.service);
        return bill.getBillingScore(val, range);

    }

    getRealization() {

    }

    getServiceTouches() {

    }

    getMultiplier() {

    }

    getTimeliness() {

    }

    getPayment() {

    }

    calculateScore() {
        
    }
}
