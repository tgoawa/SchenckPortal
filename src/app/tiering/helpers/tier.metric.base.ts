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

    protected getPercentage(displayVal: number): number {
        let progressPosition = displayVal - this.scoreRange[this.indexVal].MinValue;
        let progressRange = this.scoreRange[this.indexVal].MaxValue - this.scoreRange[this.indexVal].MinValue;

        return (progressPosition / progressRange) * 100;
    }

    protected getCurrentBandIndex(displayVal: number) {
        if (this.islowerThanBand(displayVal)) {
            this.indexVal = 0;
            return;
        }

        if (this.isHigherThanBand(displayVal)) {
            this.indexVal = this.scoreRange.length - 1;
            return;
        }
        for (let index = 0; index < this.scoreRange.length; index++) {
            if (this.isInBand(displayVal, index)) {
                this.indexVal = index;
                return;
            }
        }
    }

    protected islowerThanBand(displayVal: number): boolean {
        return displayVal < this.scoreRange[0].MinValue;
    }

    protected isHigherThanBand(displayVal: number): boolean {
       return displayVal > this.scoreRange[this.scoreRange.length - 1].MaxValue;
    }

    protected isInBand(displayVal: number, index: number): boolean {
         return displayVal > this.scoreRange[index].MinValue && displayVal <= this.scoreRange[index].MaxValue;
    }

}
