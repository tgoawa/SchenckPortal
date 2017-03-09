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

    protected getCurrentBandIndex(displayVal: number) {
        for (let x = 0; x < this.scoreRange.length; x++) {
            if (displayVal > this.scoreRange[0].MaxValue) {
                this.indexVal = 0;
                return;
            }
            if (displayVal < this.scoreRange[this.scoreRange.length - 1].MinValue) {
                this.indexVal = this.scoreRange.length - 1;
                return;
            }
            if (displayVal >= this.scoreRange[x].MinValue && displayVal <= this.scoreRange[x].MaxValue) {
                this.indexVal = x;
            }
        }
    }
}