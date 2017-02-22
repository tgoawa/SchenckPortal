import { Injectable } from '@angular/core';
import { ITierScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class TierScoreHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getScore(val, scoreObject): ITierScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (val >= scoreObject[x].MinValue && val <= scoreObject[x].MaxValue) {
                return scoreObject[x];
            }
        }
    }
}