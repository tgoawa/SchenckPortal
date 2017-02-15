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
import { ClientTierListService } from './tiering/services/client-tier-list.service';
import { BillingComponent } from './tiering/components/billing/billing.component';
import { RealizationComponent } from './tiering/components/realization/realization.component';
import { WorkTimingComponent } from './tiering/components/work-timing/work-timing.component';
import { ServiceTouchesComponent } from './tiering/components/service-touches/service-touches.component';
import { PaymentTimelinessComponent } from './tiering/components/payment-timeliness/payment-timeliness.component';
import { MultiplierComponent } from './tiering/components/multiplier/multiplier.component';



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
    BillingComponent,
    RealizationComponent,
    WorkTimingComponent,
    ServiceTouchesComponent,
    PaymentTimelinessComponent,
    MultiplierComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ClientTierListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
