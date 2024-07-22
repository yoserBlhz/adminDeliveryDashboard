import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 name: string | undefined;
  pic: string | undefined;

  constructor() {
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
  
}
