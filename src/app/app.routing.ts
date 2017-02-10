import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { ClientTierListComponent } from './tiering/components/client-tier-list/client-tier-list.component';

export const routes: Routes = [
    { path: 'home', component: MainComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'client-tier-list', component: ClientTierListComponent }
]