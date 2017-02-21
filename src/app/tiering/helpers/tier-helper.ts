import { Injectable } from '@angular/core';

import { IScore, IClientVal, Scores } from '../models/';
import { Tiering } from '../models/tiering.model';
import { BillingsHelper,
        RealizationHelper,
        MultiplierHelper,
        TimelinessHelper,
        PaymentHelper,
        ServiceTouchHelper } from './';
import { ClientTierScoreService } from '../services';

@Injectable()
export class TierHelper {
    private currentMultVal;
    private tier: Tiering = new Tiering();

    constructor( private service: ClientTierScoreService) { }
    getClientScore(displayScore: IClientVal, ranges: Scores) {
        this.getTierScore(displayScore, ranges);
        this.getWeightedScore();
        return this.tier;
    }

    getTierScore(displayScore: IClientVal, ranges: Scores) {
        this.tier.BillingScore = this.getBillings(displayScore.Billings, ranges.Billing);
        this.tier.RealizationScore = this.getRealization(displayScore.Realization, ranges.Realization);
        this.currentMultVal = this.tier.BillingScore.Score * this.tier.RealizationScore.Score;
        this.tier.MultiplierScore = this.getMultiplier(this.currentMultVal, ranges.Multiplier);
        this.tier.TimelinessScore = this.getTimeliness(displayScore.PeakPercent, ranges.WorkTiming);
        this.tier.PaymentScore = this.getPayment(displayScore.PaymentTimeliness, ranges.Payment);
        this.tier.ServiceTouchesScore = this.getServiceTouches(displayScore.ServiceTouchCount, ranges.ServiceTouch);
    }

    getWeightedScore() {
        let multiplier = this.tier.MultiplierScore.Score;

        this.tier.BillingWeighted = this.tier.BillingScore.Score;
        this.tier.MultiplierWeighted = this.tier.BillingScore.Score * this.tier.RealizationScore.Score;
        this.tier.TimelinessWeighted = this.tier.TimelinessScore.Score * multiplier;
        this.tier.ServiceTouchWeighted = this.tier.ServiceTouchesScore.Score * multiplier;
        this.tier.PaymentWeighted = this.tier.PaymentScore.Score;
        this.tier.WeightedScore = this.tier.BillingWeighted + this.tier.MultiplierWeighted + this.tier.TimelinessWeighted + this.tier.ServiceTouchWeighted + this.tier.PaymentWeighted;
    }

    getBillings(val: number, range): IScore {
        let bill = new BillingsHelper(this.service);
        return bill.getBillingScore(val, range);

    }

    getRealization(val: number, range): IScore {
        let real = new RealizationHelper(this.service);
        return real.getRealizationScore(val, range)
    }

    getServiceTouches(val: number, range): IScore {
        let touch = new ServiceTouchHelper(this.service);
        return touch.getScore(val, range);
    }

    getMultiplier(val: number, range): IScore {
        let mult = new MultiplierHelper(this.service);
        return mult.getMultiplierscore(val, range);
    }

    getTimeliness(val: number, range): IScore {
        let time = new TimelinessHelper(this.service);
        return time.getTimelinessScore(val, range);
    }

    getPayment(val: number, range): IScore {
        let pay = new PaymentHelper(this.service);
        return pay.getPaymentScore(val, range);
    }

    calculateScore() {
        
    }
}
