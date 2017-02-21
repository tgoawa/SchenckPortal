import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ClientTierListComponent } from './tiering/components/client-tier-list/client-tier-list.component';
import { ClientTierDetailsComponent } from './tiering/components/client-tier-details/client-tier-details.component';
import { ClientTierResolver,
        BillingScoreResolver,
        RealizationScoreResolver,
        MultiplierScoreResolver,
        WorkTimingScoreResolver,
        ServiceTouchScoreResolver,
        PaymentScoreResolver } from './tiering/resolver/';

export const routes: Routes = [
    { path: 'home', component: MainComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'client-tier-list', component: ClientTierListComponent },
    { path: 'client-tier-details/:id',
        component: ClientTierDetailsComponent,
        resolve: {
            parentAnalysisData: ClientTierResolver,
            billingScore: BillingScoreResolver,
            realizationScore: RealizationScoreResolver,
            multiplierScore: MultiplierScoreResolver,
            workTiming: WorkTimingScoreResolver,
            serviceTouch: ServiceTouchScoreResolver,
            paymentScore: PaymentScoreResolver
                }
    }
]