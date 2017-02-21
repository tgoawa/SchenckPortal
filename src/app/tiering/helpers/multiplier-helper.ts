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
                return scoreObject[x];
            }
        }
    }
}