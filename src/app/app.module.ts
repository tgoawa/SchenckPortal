import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APP_CONFIG, AppConfig } from './app.config';

import { routes } from './app.routing';

import { ProgressbarModule} from 'ng2-bootstrap';
import { Angular2FontawesomeModule } from 'angular2-fontawesome';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/component/nav.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { TieringComponent } from './tiering/tiering.component';
import { ClientTierListComponent } from './tiering/components/client-tier-list/clientTierList.component';
import { ClientTierDetailsComponent } from './tiering/components/client-tier-details/clientTierDetails.component';

import { ClientTierListService, ClientTierAnalysisService, ClientTierScoreService } from './tiering/services/';
import { StrategyPlanService } from './businessDevelopment/services';

import { ClientTierMetricHelper } from './tiering/helpers/';
import { ClientTierResolver,
        BillingScoreResolver,
        RealizationScoreResolver,
        MultiplierScoreResolver,
        WorkTimingScoreResolver,
        ServiceTouchScoreResolver,
        PaymentScoreResolver,
        TierScoreResolver } from './tiering/resolver/';

import { LoginComponent } from './login/components/login.component';
import { LoginService } from './login/services/login.service';
import { TeamMemberService, TeamMemberResolver } from './teamMember/';

import { AuthGuard } from './auth/auth.guard';
import { StrategyPlanComponent } from './businessDevelopment/components/strategyPlan/strategyPlan.component';








@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    MainComponent,
    TieringComponent,
    ClientTierListComponent,
    ClientTierDetailsComponent,
    LoginComponent,
    StrategyPlanComponent,
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true}),
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    LoginService,
    ClientTierListService,
    ClientTierAnalysisService,
    ClientTierScoreService,
    StrategyPlanService,
    ClientTierMetricHelper,
    ClientTierResolver,
    BillingScoreResolver,
    RealizationScoreResolver,
    MultiplierScoreResolver,
    WorkTimingScoreResolver,
    ServiceTouchScoreResolver,
    PaymentScoreResolver,
    TierScoreResolver,
    TeamMemberService,
    TeamMemberResolver,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
