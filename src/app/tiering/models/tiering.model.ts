import { IScore } from './score';

export interface ITiering {
    BillingScore: IScore;
    RealizationScore: IScore;
    ServiceTouchesScore: IScore;
    MultiplierScore: IScore;
    TimelinessScore: IScore;
    PaymentScore: IScore;
    Tier: string;
}
