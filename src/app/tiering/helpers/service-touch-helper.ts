import { Injectable } from '@angular/core';
import { IScore } from '../models';

import { ClientTierScoreService } from '../services';

@Injectable()
export class ServiceTouchHelper {

    constructor(private clientTierService: ClientTierScoreService) { 
    }

    getScore(serviceTouchVal, scoreObject): IScore {
         for (let x = 0; x < scoreObject.length; x++) {
            if (serviceTouchVal >= scoreObject[x].MinValue && serviceTouchVal <= scoreObject[x].MaxValue) {
                if (x + 1 < scoreObject.length) {
                    scoreObject[x].ToNextLevel = scoreObject[x + 1].MinValue - serviceTouchVal;
                } else {
                    scoreObject[x].ToNextLevel = 0;
                }
                return scoreObject[x];
            }
        }
    }
}