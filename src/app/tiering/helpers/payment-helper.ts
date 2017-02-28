import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class PaymentHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getPaymentScore(paymentVal, scoreObject): IScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (paymentVal >= scoreObject[x].MinValue && paymentVal <= scoreObject[x].MaxValue) {
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MaxValue - paymentVal;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                let divisor = scoreObject[x].MaxValue - scoreObject[x].MinValue;
                let numerator = scoreObject[x].MaxValue - paymentVal;
                scoreObject[x].ProgressPercent = numerator / divisor;
                return scoreObject[x];
            }
        }
    }
}