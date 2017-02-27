import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class MultiplierHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getMultiplierscore(val, scoreObject): IScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (val >= scoreObject[x].MinValue && val <= scoreObject[x].MaxValue) {
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MinValue - val;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                scoreObject[x].ProgressPercent = (val / scoreObject[x].MaxValue);
                return scoreObject[x];
            }
        }
    }
}