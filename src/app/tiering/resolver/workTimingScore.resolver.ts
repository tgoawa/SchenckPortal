import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ClientTierScoreService } from '../services/';

@Injectable()
export class WorkTimingScoreResolver implements Resolve<any> {
    constructor(private scoreService: ClientTierScoreService) { }

    resolve() {
        return this.scoreService.getWorkTiming();
    }
}