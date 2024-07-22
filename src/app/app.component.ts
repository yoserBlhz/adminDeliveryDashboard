import { Component, ApplicationRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { TransporteurComponent } from './components/transporteur/transporteur.component';
import { ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet, 
        ReactiveFormsModule,
        NavbarComponent,
        SidebarComponent,
        DashboardComponent,
        LoginComponent,
        ReclamationComponent,
        TransporteurComponent]
    
})
export class AppComponent {
  
}