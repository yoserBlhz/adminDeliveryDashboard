import { Component, ApplicationRef, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
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
   constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

   /* ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        window.addEventListener('popstate', () => {
          const loginUser = sessionStorage.getItem('loginuser');
          if (!loginUser) {
            this.router.navigate(['/']);
          }
        });
      }
    }*/

}