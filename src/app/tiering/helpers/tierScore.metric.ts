import { Injectable } from '@angular/core';
import { Score } from '../models/';

import { TierMetricBase } from './';

export class TierScoreMetric extends TierMetricBase {

    getTierScore(displayVal: number): Score {
        this.score = new Score();
        this.getCurrentBandIndex(displayVal);
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.Weighted = displayVal;
        this.score.ProgressPercent = this.getPercentage(displayVal);

        return this.score;
    }

    protected islowerThanBand(displayVal: number): boolean {
        return displayVal > this.scoreRange[0].MaxValue;
    }

    protected isHigherThanBand(displayVal: number): boolean {
        return displayVal < this.scoreRange[this.scoreRange.length - 1].MinValue;
    }

    protected isInBand(displayVal: number, index: number): boolean {
        return displayVal > this.scoreRange[index].MinValue && displayVal <= this.scoreRange[index].MaxValue;
    }
}
