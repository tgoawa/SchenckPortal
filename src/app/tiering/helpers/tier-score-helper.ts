import { Injectable } from '@angular/core';
import { ITierScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class TierScoreHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getScore(scoreVal, scoreObject): ITierScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (scoreVal >= scoreObject[x].MinValue && scoreVal <= scoreObject[x].MaxValue) {
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MinValue - scoreVal;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                return scoreObject[x];
            }
        }
    }
}