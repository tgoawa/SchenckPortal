import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class BillingsHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getBillingScore(billingVal, scoreObject: IScore[]): IScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (billingVal >= scoreObject[x].MinValue && billingVal <= scoreObject[x].MaxValue) {
                scoreObject[x].ProgressPercent = (billingVal / scoreObject[x].MaxValue);
                return scoreObject[x];
            }
        }
    }
}