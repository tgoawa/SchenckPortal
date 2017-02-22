export interface IClientVal {
    Billings: number;
    Realization: number;
    ServiceTouchCount: number;
    PeakPercent: number;
    PaymentTimeliness: number;
}

export class ClientVal implements IClientVal {
    Billings: number;
    Realization: number;
    ServiceTouchCount: number;
    PeakPercent: number;
    PaymentTimeliness: number;
}