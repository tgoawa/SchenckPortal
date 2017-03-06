import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

export class ServiceTouchMetric extends TierMetricBase {

    getServiceTouchScore(displayVal: number, multiplier: number): IScore {
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = this.getWeightedValue(multiplier, this.score.Score);
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}
