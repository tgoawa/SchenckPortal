import { Injectable } from '@angular/core';
import { IScore } from '../models/';

import { TierMetricBase } from './';

export class BillingMetric extends TierMetricBase {

    getBillingScore(): IScore {
        this.score.MaxValue = this.getMaxValue();
        this.score.MinValue = this.getMinValue();
        this.score.Score = this.getScoreValue();
        this.score.ProgressPercent = this.getPercentage();

        return this.score;
    }
}