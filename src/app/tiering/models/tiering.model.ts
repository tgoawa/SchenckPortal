import { IScore, ITierScore } from './';

export interface ITiering {
    BillingScore: IScore;
    BillingWeighted: number;
    RealizationScore: IScore;
    ServiceTouchesScore: IScore;
    ServiceTouchWeighted: number;
    MultiplierScore: IScore;
    MultiplierWeighted: number;
    TimelinessScore: IScore;
    TimelinessWeighted: number;
    PaymentScore: IScore;
    PaymentWeighted: number;
    WeightedScore: number;
    Tier: ITierScore;
}

export class Tiering implements ITiering {
    BillingScore: IScore;
    BillingWeighted: number;
    RealizationScore: IScore;
    ServiceTouchesScore: IScore;
    ServiceTouchWeighted: number;
    MultiplierScore: IScore;
    MultiplierWeighted: number;
    TimelinessScore: IScore;
    TimelinessWeighted: number;
    PaymentScore: IScore;
    PaymentWeighted: number;
    WeightedScore: number;
    Tier: ITierScore;
}
