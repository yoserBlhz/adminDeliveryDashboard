/*import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarloginComponent } from "../navbarlogin/navbarlogin.component";

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarloginComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  loginobject: any = {
    email: '',
    password: ''
  };
  signupusers: any[] = [];
  isDropdownOpen = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  credentials = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUsers = localStorage.getItem('signupusers');
      if (storedUsers) {
        this.signupusers = JSON.parse(storedUsers);
      }
      console.log("users", this.signupusers);

      google.accounts.id.initialize({
        client_id: '888422676843-p3rfqqrjmgcp5710ecumgdeprjn7emqn.apps.googleusercontent.com',
        callback: (resp: any) => this.handleLogin(resp),
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 320
      });
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  login(): void {
    const isUserExist = this.signupusers.find(m => m.email === this.loginobject.email && m.password === this.loginobject.password);
    if (isUserExist !== undefined) {
      sessionStorage.setItem("loginuser", JSON.stringify({
        name: isUserExist.email,
        picture: 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png',
        loginType: 'username'
      }));
      this.errorMessage = '';
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Username or password is incorrect';
    }
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loginuser", JSON.stringify({
        name: payload.name,
        picture: payload.picture,
        loginType: 'google'
      }));
      this.ngZone.run(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

*/
import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarloginComponent } from "../navbarlogin/navbarlogin.component";

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NavbarloginComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  loginobject: any = {
    email: '',
    password: ''
  };
  signupusers: any[] = [];
  isDropdownOpen = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  credentials = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storedUsers = localStorage.getItem('signupusers');
      if (storedUsers) {
        this.signupusers = JSON.parse(storedUsers);
      }
      console.log("users", this.signupusers);

      google.accounts.id.initialize({
        client_id: '888422676843-p3rfqqrjmgcp5710ecumgdeprjn7emqn.apps.googleusercontent.com',
        callback: (resp: any) => this.handleLogin(resp),
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 320
      });
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  login(): void {
    const isUserExist = this.signupusers.find(m => m.email === this.loginobject.email && m.password === this.loginobject.password);
    if (isUserExist !== undefined) {
      sessionStorage.setItem("loginuser", JSON.stringify({
        name: isUserExist.email,
        picture: 'https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png',
        loginType: 'username'
      }));
      this.errorMessage = '';
      if (sessionStorage.getItem("loginuser")) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.errorMessage = 'Username or password is incorrect';
    }
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem("loginuser", JSON.stringify({
        name: payload.name,
        picture: payload.picture,
        loginType: 'google'
      }));
      this.ngZone.run(() => {
        if (sessionStorage.getItem("loginuser")) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
