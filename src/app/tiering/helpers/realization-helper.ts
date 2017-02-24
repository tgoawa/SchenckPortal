import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class RealizationHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getRealizationScore(realizationVal, scoreObject: IScore[]): IScore {
        for (let x = 0; x < scoreObject.length; x++) {
            if (realizationVal >= scoreObject[x].MinValue  && realizationVal <= scoreObject[x].MaxValue ) {
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MinValue - realizationVal;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                return scoreObject[x];
            }
        }
    }
}