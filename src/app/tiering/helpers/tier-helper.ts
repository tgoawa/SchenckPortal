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

    constructor( private service: ClientTierScoreService) { }

    getTierScore(displayScore: IClientVal, ranges: Scores): Tiering {
      let tier = new Tiering();
      
      tier.BillingScore = this.getBillings(displayScore.Billings, ranges.Billing);
      tier.RealizationScore = this.getRealization(displayScore.Realization, ranges.Realization);
    //tier.MultiplierScore = this.getMultiplier(displayScore.);
        tier.TimelinessScore = this.getTimeliness(displayScore.PeakPercent, ranges.WorkTiming);
        tier.PaymentScore = this.getPayment(displayScore.PaymentTimeliness, ranges.Payment);
        tier.ServiceTouchesScore = this.getServiceTouches(displayScore.ServiceTouchCount, ranges.ServiceTouch);
        
        return tier;
    }

   private getBillings(val: number, range): IScore {
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
