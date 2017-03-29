import { IStrategyEvent } from '../../events/models/strategyEvent.model';

export interface IStrategyPlan {
    PlanId: number;
    TeamMemberId: number;
    MarketingMemberId: number;
    Title: string;
    KnownAsId: number;
    Famous: string;
    DisplayDateCreated: string;
    DisplayDateModified: string;
    StrategyEvents: IStrategyEvent[];
}