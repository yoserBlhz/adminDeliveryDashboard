/*import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {  Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
isloggedstate !:BehaviorSubject<boolean>
loggedInUser: any;

  constructor(private http: HttpClient, private router:Router,@Inject(PLATFORM_ID) private platformId: Object) 
  { 
    this.isloggedstate = new BehaviorSubject<boolean>(this.isLoggedIn());
  
  }

  register(user: any): Observable<any> {
    return this.http.post(`https://freeapi.miniprojectideas.com/api/JWT/CreateNewUser`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.text() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(() => errMsg);
  }

  login(credentials: any): Observable<any> 
  {
    return this.http.post(`https://freeapi.miniprojectideas.com/api/JWT/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('tokenExpiration', response.expiration);
          localStorage.setItem('loggedInUser', credentials.userName); 
          this.loggedInUser = credentials.userName; 
          console.log(  "jjjjj",this.loggedInUser );
          this.isloggedstate.next(true);
        }
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  
  isLoggedIn(): boolean {
   const token = this.getToken();
    const expiration = localStorage.getItem('tokenExpiration');
    
    //-------------if loggedInUser not set or  undefined get it
    if (!this.loggedInUser) {
      this.loggedInUser = localStorage.getItem('loggedInUser');
    }
  
    return !!token && new Date(expiration!) > new Date(); 
  }
  

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem("loginuser");

    localStorage.clear();
    sessionStorage.clear();
    this.loggedInUser = null;
    this.isloggedstate.next(false);
    this.router.navigate(['/']);
  }
  
}*/
/*
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloggedstate!: BehaviorSubject<boolean>;
  loggedInUser: any;
  private platformId: Object;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this.isloggedstate = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  register(user: any): Observable<any> {
    return this.http.post(`https://freeapi.miniprojectideas.com/api/JWT/CreateNewUser`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  login(credentials: any): Observable<any> {
    console.log('Attempting to login with credentials:', credentials); // Vérifiez les informations envoyées
    return this.http.post(`https://freeapi.miniprojectideas.com/api/JWT/login`, credentials).pipe(
      map((response: any) => {
        console.log('Response from login API:', response); 
        if (response && response.token) {
          if (isPlatformBrowser(this.platformId)) {
            console.log('Running in browser');

            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('tokenExpiration', response.expiration);
            localStorage.setItem('loggedInUser', credentials.userName);

          console.log('JWT Token:', localStorage.getItem('jwtToken'));
          console.log('Token Expiration:', localStorage.getItem('tokenExpiration'));
          console.log('Logged In User:', localStorage.getItem('loggedInUser'));
          }
          this.loggedInUser = credentials.userName;
          this.isloggedstate.next(true);
        }
        return response;
      }),
      catchError(error => {
        console.error('Error in login API:', error); 
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const expiration = localStorage.getItem('tokenExpiration');
      if (!this.loggedInUser) {
        this.loggedInUser = localStorage.getItem('loggedInUser');
      }
      return !!token && new Date(expiration!) > new Date();
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('loggedInUser');
      sessionStorage.removeItem('loginuser');
      localStorage.clear();
      sessionStorage.clear();
    }
    this.loggedInUser = null;
    this.isloggedstate.next(false);
    this.router.navigate(['/']);
  }
    
}*/




import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloggedstate!: BehaviorSubject<boolean>;
  loggedInUser: any;
  private platformId: Object;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this.isloggedstate = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  register(user: any): Observable<any> {
    return this.http.post(`https://freeapi.miniprojectideas.com/api/JWT/CreateNewUser`, user, { observe: 'response' })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  login(credentials: any): Observable<any> {
    console.log('Attempting to login with credentials:', credentials); 
    return this.http.post(`https://freeapi.miniprojectideas.com/api/JWT/login`, credentials).pipe(
      map((response: any) => {
        console.log('Response from login API:', response); 
        if (response && response.token) {
          if (isPlatformBrowser(this.platformId)) {
            console.log('Running in browser');

            sessionStorage.setItem('jwtToken', response.token);
            sessionStorage.setItem('tokenExpiration', response.expiration);
            sessionStorage.setItem('loggedInUser', credentials.userName);

            console.log('JWT Token:', sessionStorage.getItem('jwtToken'));
            console.log('Token Expiration:', sessionStorage.getItem('tokenExpiration'));
            console.log('Logged In User:', sessionStorage.getItem('loggedInUser'));
          }
          this.loggedInUser = credentials.userName;
          this.isloggedstate.next(true);
        }
        return response;
      }),
      catchError(error => {
        console.error('Error in login API:', error); 
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('jwtToken');
    }
    return null;
  }

 
 
    public isLoggedIn(): boolean {
      if (isPlatformBrowser(this.platformId)) {
        if (!this.loggedInUser) {
          this.loggedInUser = sessionStorage.getItem('loginuser');
        }
        return !!this.loggedInUser;
      }
      return false;
    }
  
    public logout(): void {
      sessionStorage.removeItem('loginuser');
      this.loggedInUser = null;
            this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }


    
}

