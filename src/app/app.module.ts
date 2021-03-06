import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OpaqueToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APP_CONFIG, AppConfig } from './app.config';

import { routes } from './app.routing';

import { NegativeToParenthesis } from './customPipes';

import { ProgressbarModule,
        ModalModule,
        AlertModule } from 'ngx-bootstrap';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
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
import { StrategyPlanService } from './businessDevelopment/planHeader/services/strategyPlan.service';
import { DropDownDataService } from './businessDevelopment/planLookups/services/dropDownData.service';
import { StrategyEventService } from './businessDevelopment/events/services/strategyEvent.service';
import { MarketingAdminService } from './businessDevelopment/marketingAdmin/services/marketingAdmin.service';

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
import { ActionItemsComponent } from './businessDevelopment/actionItems/components/actionItems.component';
import { EventsComponent } from './businessDevelopment/events/components/events.component';
import { ClientContactsComponent } from './businessDevelopment/clientContacts/components/clientContacts.component';
import { MarketingAdminComponent } from './businessDevelopment/marketingAdmin/components/marketingAdmin.component';
import { OutreachInterestsComponent } from './businessDevelopment/outreachAndInterests/components/outreachAndInterests.component';
import { BusinessPeopleComponent } from './businessDevelopment/businessPeople/components/businessPeople.component';
import { PlanHeaderComponent } from './businessDevelopment/planHeader/components/planHeader.component';
import { MentorStrategyPlanComponent } from './businessDevelopment/mentorStrategyPlan/components/mentorStrategyPlan.component';
import { IndividualStrategyPlanComponent } from './businessDevelopment/individualStrategyPlan/components/individualStrategyPlan.component';









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
    NegativeToParenthesis,
    ActionItemsComponent,
    EventsComponent,
    ClientContactsComponent,
    MarketingAdminComponent,
    OutreachInterestsComponent,
    BusinessPeopleComponent,
    PlanHeaderComponent,
    MentorStrategyPlanComponent,
    IndividualStrategyPlanComponent,
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true}),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    Ng2AutoCompleteModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    LoginService,
    ClientTierListService,
    ClientTierAnalysisService,
    ClientTierScoreService,
    MarketingAdminService,
    StrategyPlanService,
    DropDownDataService,
    StrategyEventService,
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
