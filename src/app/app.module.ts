import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routing';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/component/nav.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { TieringComponent } from './tiering/tiering.component';
import { ClientTierListComponent } from './tiering/components/client-tier-list/client-tier-list.component';
import { ClientSearchComponent } from './tiering/components/client-search/client-search.component';
import { ClientListTableComponent } from './tiering/components/client-list-table/client-list-table.component';
import { ClientTierDetailsComponent } from './tiering/components/client-tier-details/client-tier-details.component';
import { ClientTierListService, ClientTierAnalysisService, ClientTierScoreService } from './tiering/services/';
import { TierHelper } from './tiering/helpers/';
import { ClientTierResolver,
        BillingScoreResolver,
        RealizationScoreResolver,
        MultiplierScoreResolver,
        WorkTimingScoreResolver,
        ServiceTouchScoreResolver,
        PaymentScoreResolver } from './tiering/resolver/';





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
    ClientSearchComponent,
    ClientListTableComponent,
    ClientTierDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ClientTierListService,
    ClientTierAnalysisService,
    ClientTierScoreService,
    TierHelper,
    ClientTierResolver,
    BillingScoreResolver,
    RealizationScoreResolver,
    MultiplierScoreResolver,
    WorkTimingScoreResolver,
    ServiceTouchScoreResolver,
    PaymentScoreResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
