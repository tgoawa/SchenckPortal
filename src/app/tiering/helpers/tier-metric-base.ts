import { IScore, ScoreRanges } from '../models/';

export class TierMetricBase {
    protected scoreRange: IScore[];
    protected indexVal: number;
    protected score: IScore;

    constructor(scoreRange: IScore[]) {
        this.scoreRange = scoreRange;
    }

    protected getScoreValue(): number {
        return this.scoreRange[this.indexVal].Score;
    }

    protected getMinValue(): number {
        return this.scoreRange[this.indexVal].MinValue;
    }

    protected getMaxValue(): number {
        return this.scoreRange[this.indexVal].MaxValue;
    }

    protected getWeightedValue(multiplier: number, score: number): number {
        return score * multiplier;
    }

    protected getPercentage(): number {
        return this.indexVal / this.scoreRange[this.indexVal].MaxValue;
    }

    protected getCurrentBandIndex(displayVal: number) {
        for (let x = 0; x < this.scoreRange.length; x++) {
            if (displayVal >= this.scoreRange[x].MinValue && displayVal <= this.scoreRange[x].MaxValue) {
                this.indexVal = x;
            }
        }
    }
}