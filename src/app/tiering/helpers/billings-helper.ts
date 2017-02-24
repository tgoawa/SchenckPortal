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
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MinValue - billingVal;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                return scoreObject[x];
            }
        }
    }
}