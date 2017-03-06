import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

export class TierScoreMetric extends TierMetricBase {

    getTierScore(displayVal: number): IScore {
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Weighted = displayVal;
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}
