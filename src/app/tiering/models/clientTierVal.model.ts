import { IClientChildren } from './clientChildren.model';
import { IServices } from './services.model';

export interface IClientVal {
    ClientName: string;
    IsNew: boolean;
    Billings: number;
    Realization: number;
    ServiceTouchCount: number;
    PeakPercent: number;
    PaymentTimeliness: number;
    Children: IClientChildren[];
    ServiceTouches: IServices[];
}

export class ClientVal implements IClientVal {
    ClientName: string;
    IsNew: boolean;
    Billings: number;
    Realization: number;
    ServiceTouchCount: number;
    PeakPercent: number;
    PaymentTimeliness: number;
    Children: IClientChildren[];
    ServiceTouches: IServices[];
}
