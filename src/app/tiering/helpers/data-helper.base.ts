import { IScore, ScoreRanges } from '../models/';

export class DataHelperBase {
    private scoreRange: IScore[];
    private indexVal: number;

    constructor(scoreRange: IScore[]) {
        this.scoreRange = scoreRange;
    }

    getScore(): number {
        return this.scoreRange[this.indexVal].Score;
    }

    getMin(): number {
        return this.scoreRange[this.indexVal].MinValue;
    }

    getMax(): number {
        return this.scoreRange[this.indexVal].MaxValue;
    }

    getWeighted() {}

    getDifference(displayVal: number): number {
        if (this.indexVal + 1 < this.scoreRange.length) {
            return this.scoreRange[this.indexVal + 1].MinValue - displayVal;
        } else {
            return 0;
        }
    }

    getPercentage(): number {
        return this.indexVal / this.scoreRange[this.indexVal].MaxValue;
    }

    getCurrentBandIndex(displayVal: number) {
        for (let x = 0; x < this.scoreRange.length; x++) {
            if (displayVal >= this.scoreRange[x].MinValue && displayVal <= this.scoreRange[x].MaxValue) {
                this.indexVal = x;
            }
        }
    }
}
