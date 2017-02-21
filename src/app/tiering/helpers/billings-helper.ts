import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class BillingsHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getBillingScore(val, scoreObject): IScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (val >= scoreObject[x].MinValue && val <= scoreObject[x].MaxValue) {
                return scoreObject[x];
            }
        }
    }
}