// src/app/services/reclamation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reclamation {
  nom: string;
  prenom: string;
  phone: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiUrl = 'http://localhost:3000/reclamations'; 

  constructor(private http: HttpClient) {}

  getReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }
  
  countAll(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/all`);
  }
}
