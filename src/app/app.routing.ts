import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/components/login.component';
import { ClientTierListComponent } from './tiering/components/client-tier-list/clientTierList.component';
import { ClientTierDetailsComponent } from './tiering/components/client-tier-details/clientTierDetails.component';
import {
    ClientTierResolver,
    BillingScoreResolver,
    RealizationScoreResolver,
    MultiplierScoreResolver,
    WorkTimingScoreResolver,
    ServiceTouchScoreResolver,
    PaymentScoreResolver,
    TierScoreResolver
} from './tiering/resolver/';

import { StrategyPlanComponent } from './businessDevelopment/components/strategyPlan/strategyPlan.component';
import { MarketingAdminComponent } from './businessDevelopment/components/marketingAdmin/marketingAdmin.component';
import { TeamMemberResolver } from './teamMember/';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: MainComponent,
        canActivate: [AuthGuard],
        resolve: {
            teamMemberData: TeamMemberResolver
        },
        children: [
            {
                path: 'client-tier-list', component: ClientTierListComponent,
                resolve: {
                    teamMemberData: TeamMemberResolver
                }
            },
            {
                path: 'client-tier-details/:id',
                component: ClientTierDetailsComponent,
                resolve: {
                    parentAnalysisData: ClientTierResolver,
                    billingScore: BillingScoreResolver,
                    realizationScore: RealizationScoreResolver,
                    multiplierScore: MultiplierScoreResolver,
                    workTiming: WorkTimingScoreResolver,
                    serviceTouch: ServiceTouchScoreResolver,
                    paymentScore: PaymentScoreResolver,
                    tierScore: TierScoreResolver
                }
            },
            {
                path: 'strategy-plan',
                component: StrategyPlanComponent,
            },
            {
                path: 'marketing-admin',
                component: MarketingAdminComponent
            }
        ]
    },
]