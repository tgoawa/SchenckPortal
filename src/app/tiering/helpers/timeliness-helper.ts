import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class TimelinessHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getTimelinessScore(workTimingVal, scoreObject): IScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (workTimingVal >= scoreObject[x].MinValue && workTimingVal <= scoreObject[x].MaxValue) {
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MaxValue - workTimingVal;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                let divisor = scoreObject[x].MaxValue - scoreObject[x].MinValue;
                let numerator = scoreObject[x].MaxValue - workTimingVal;
                scoreObject[x].ProgressPercent = numerator / divisor;
                return scoreObject[x];
            }
        }
    }
}