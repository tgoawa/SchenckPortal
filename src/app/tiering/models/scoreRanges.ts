import { IScore } from './score';

export interface ScoreRanges {
    Billing: IScore[];
    Realization: IScore[];
    Multiplier: IScore[];
    WorkTiming: IScore[];
    ServiceTouch: IScore[];
    Payment: IScore[];
    Tier: IScore[];
}

export class Scores implements ScoreRanges 
{
    Billing: IScore[];
    Realization: IScore[];
    Multiplier: IScore[];
    WorkTiming: IScore[];
    ServiceTouch: IScore[];
    Payment: IScore[];
    Tier: IScore[];
}