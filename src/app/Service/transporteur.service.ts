import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transporteur {
  _id:string,
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
}

export interface CreateTransporteur {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root',
})
export class TransporteurService {
  private apiUrl = 'http://localhost:3000/transporteur'; 

  constructor(private http: HttpClient) {}

  getTransporteurs(): Observable<Transporteur[]> {
    return this.http.get<Transporteur[]>(this.apiUrl);
  }


  addTransporteur(transporteur: CreateTransporteur): Observable<CreateTransporteur> {
    return this.http.post<CreateTransporteur>(this.apiUrl, transporteur);
  }


  updateTransporteur(id: string, transporteur: Partial<Transporteur>): Observable<Transporteur> {
    return this.http.put<Transporteur>(`${this.apiUrl}/${id}`, transporteur);
  }

  deleteTransporteur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  countAllLivreurs(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/all`);
  }

}
