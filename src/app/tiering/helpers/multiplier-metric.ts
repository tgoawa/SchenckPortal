import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

export class MultiplierMetric extends TierMetricBase {

    getMultiplierScore(multiplier: number): IScore {
        this.score.Weighted = multiplier;
        this.getCurrentBandIndex(this.score.Weighted);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}
