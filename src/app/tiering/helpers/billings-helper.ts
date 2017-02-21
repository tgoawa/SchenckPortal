import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class BillingsHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getBillingScore(val, billingRange): IScore {
        for (let x = 0; x < billingRange.length; x++) {
            if (val >= billingRange[x].MinValue && val <= billingRange[x].MaxValue) {
                return billingRange[x];
            }
        }
    }
}