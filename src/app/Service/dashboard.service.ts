// src/app/services/reclamation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Facture {
  _id: string;
  status: string;
  clientName:string;
  clientPhone:string;
  description:string;
  location:string;
  amount:number;  
  livreur: string;
}

export interface CreateFacture {
  status: string;
  clientName:string;
  clientPhone:string;
  description:string;
  location:string;
  amount:number; 
  livreur:string; 
}

export interface UpdateFacture {
  _id: string;
  status: string;
  clientName:string;
  clientPhone:string;
  description:string;
  location:string;
  amount:string;  
  livreur: string;
}



@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    private baseUrl = 'http://localhost:3000/facturenew';


    constructor(private http: HttpClient) { }
  
    countAll(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/count/all`);
    }
  
    countByStatus(status: string): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/count/status/${status}`);
    }


}
