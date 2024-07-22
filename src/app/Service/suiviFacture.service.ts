// src/app/services/reclamation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transporteur, TransporteurService } from './transporteur.service';

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
export class SuiviFactureService {
  private apiUrl = 'http://localhost:3000/facturenew'; 

  constructor(private http: HttpClient,private transporteurService:TransporteurService) {}

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.apiUrl);
  }

        addFacture(facture: CreateFacture): Observable<CreateFacture> {
          console.log('Sending new facture:', facture);
          return this.http
            .post<CreateFacture>(this.apiUrl, facture)
            .pipe(
              catchError(this.handleError)
            );
        }
      
        private handleError(error: HttpErrorResponse) {
          let errorMessage = 'Unknown error occurred';
          if (error.error instanceof ErrorEvent) {
            // Erreur côté client
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Erreur côté serveur
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.error(errorMessage);
          return throwError(errorMessage);
        }


        updateFacture(id: string, facture: Partial<UpdateFacture>): Observable<UpdateFacture> {
          return this.http.put<UpdateFacture>(`${this.apiUrl}/${id}`, facture);
        }
      
        deleteFacture(id: string): Observable<void> {
          return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }



        countByLivreur(livreur: string): Observable<number> {
          return this.http.get<number>(`${this.apiUrl}/transporteur/count/${livreur}`);
        }
      
        // Method to fetch all livreurs' names if needed
        getAllLivreurs(): Observable<Transporteur[]> {
          return this.transporteurService.getTransporteurs();
        }
}
