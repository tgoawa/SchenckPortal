import { IStrategyEvent } from '../../events/models/strategyEvent.model';
import { TeamMember } from '../../../teamMember';

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
    Mentor: TeamMember;
}

export class StrategyPlan implements IStrategyPlan {
    PlanId = 0;
    TeamMemberId = 0;
    MarketingMemberId = 0;
    Title = '';
    KnownAsId = 0;
    Famous = '';
    DisplayDateCreated = '';
    DisplayDateModified = '';
    StrategyEvents = [];
    Mentor;
}
