export interface IScore {
    Score: number;
    Weighted: number;
    MinValue: number;
    MaxValue: number;
    ProgressPercent: number;
}

export class Score implements IScore {
    Score: number;
    Weighted: number;
    MinValue: number;
    MaxValue: number;
    ProgressPercent: number;
}
