import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isloggedstate !:BehaviorSubject<boolean>
loggedInUser: any;
  constructor(private http: HttpClient) 
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
  
  
}