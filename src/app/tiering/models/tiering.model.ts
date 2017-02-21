import { IScore } from './score';

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
    Tier: string;
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
    Tier: string;
}
