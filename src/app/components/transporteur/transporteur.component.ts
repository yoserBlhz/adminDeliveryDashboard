import { Component, OnInit } from '@angular/core';
import {  EventEmitter, Output } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CreateTransporteur, Transporteur, TransporteurService } from '../../Service/transporteur.service';
import { CommonModule, NgFor } from '@angular/common';

/*declare var bootstrap: any;


@Component({
  selector: 'app-transporteur',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent,CommonModule, 
    NgFor],
  templateUrl: './transporteur.component.html',
  styleUrl: './transporteur.component.css'
})
export class TransporteurComponent implements OnInit {

  @Output() settingsEvent = new EventEmitter<void>();
isSidebarClosed = false;

handleSidebarToggle(isClosed: boolean) {
  this.isSidebarClosed = isClosed;
}


  emitSettingsEvent() {
    this.settingsEvent.emit();
  }

    openSettingsModal() {
      const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
        keyboard: false
      });
      settingsModal.show();
    }



    transporteurs: Transporteur[] = [];

  constructor(private transporteurService: TransporteurService) {}

  ngOnInit(): void {

    this.transporteurService.getTransporteurs().subscribe((data) => {
      this.transporteurs = data;
    });

  }

  

}
*/

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  imports: [NavbarComponent, SidebarComponent,CommonModule,NgFor,FormsModule],
    standalone: true,
  selector: 'app-transporteur',
  templateUrl: './transporteur.component.html',
  styleUrls: ['./transporteur.component.css']
})
export class TransporteurComponent implements OnInit {
  transporteurs: Transporteur[] = [];
  transporteurForm: FormGroup;
  isSidebarClosed = false;

  transporteur: Partial<Transporteur> = {};
  isEditing = false;
  currentTransporteurId: string | null = null;
  
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  email: string = '';
  password: string = '';
  
  constructor(private transporteurService: TransporteurService, private fb: FormBuilder) {
    this.transporteurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTransporteurs();
  }

  loadTransporteurs() {
    this.transporteurService.getTransporteurs().subscribe(data => {
      this.transporteurs = data;
    });
  }

  openSettingsModal() {
    this.nom = '';
  this.prenom = '';
  this.telephone = '';
  this.email = '';
  this.password = '';
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
      keyboard: false
    });
    settingsModal.show();
  }

  saveTransporteur() {
    console.log("fonction save**********");
    const newTransporteur: CreateTransporteur = {
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
      email: this.email,
      password: this.password,
    };
    console.log("********",newTransporteur);

    this.transporteurService.addTransporteur(newTransporteur).subscribe(() => {
      this.loadTransporteurs();
    });
    const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
      settingsModal.hide();
  }


handleSidebarToggle(isClosed: boolean) {
  this.isSidebarClosed = isClosed;
}

fetchTransporteurs(): void {
  this.transporteurService.getTransporteurs().subscribe(data => {
    this.transporteurs = data;
  });
}

deleteTransporteur(id: string): void {
  this.transporteurService.deleteTransporteur(id).subscribe(() => {
    this.fetchTransporteurs();
  });
}


openEditModal(transporteur: Transporteur) {
  this.currentTransporteurId = transporteur._id;
  this.nom = transporteur.nom;
  this.prenom = transporteur.prenom;
  this.telephone = transporteur.telephone;
  this.email = transporteur.email;
  this.password = transporteur.password;

  const editModal = new bootstrap.Modal(document.getElementById('editModal'), {
    keyboard: false
  });
  editModal.show();
}

updateTransporteur() {
  if (!this.currentTransporteurId) {
    console.error('No transporteur selected for update.');
    return;
  }

  const updatedTransporteur: Transporteur = {
    _id: this.currentTransporteurId,
    nom: this.nom,
    prenom: this.prenom,
    telephone: this.telephone,
    email: this.email,
    password: this.password,
  };

  this.transporteurService.updateTransporteur(this.currentTransporteurId, updatedTransporteur).subscribe(() => {
    this.loadTransporteurs();
  });

  const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
  editModal.hide();
}




}
