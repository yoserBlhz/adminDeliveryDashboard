/*import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { TransporteurComponent } from './components/transporteur/transporteur.component';
import { SuiviFactureComponent } from './components/suivi-facture/suivi-facture.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    //{ path: 'home', component: DashboardComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reclamations', component: ReclamationComponent },
    { path: 'invoiceTrack', component: SuiviFactureComponent },
    { path: 'transporteur', component: TransporteurComponent},
    { path: 'dashboard', component: DashboardComponent},
];*/

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { TransporteurComponent } from './components/transporteur/transporteur.component';
import { SuiviFactureComponent } from './components/suivi-facture/suivi-facture.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'; 

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reclamations', component: ReclamationComponent,canActivate: [AuthGuard] },
  { path: 'invoiceTrack', component: SuiviFactureComponent, canActivate: [AuthGuard] },
  { path: 'transporteur', component: TransporteurComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];




