import { Component } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 name: string | undefined;
  pic: string | undefined;
  

  constructor(private authService: AuthService,private router:Router) {
    this.loadUserInfo();
  }

  ngOnInit() {
  }

  loadUserInfo() {
    if (typeof sessionStorage !== 'undefined') {
      const loginUser = JSON.parse(sessionStorage.getItem("loginuser")!);
      if (loginUser) {
        this.name = loginUser.name;
      }
    }
  }
  
  logOut() {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
   // this.router.navigate(['/']);
   //this.authService.logout(); 
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    
  }
}

