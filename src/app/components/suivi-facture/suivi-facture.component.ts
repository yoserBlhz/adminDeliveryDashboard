import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateFacture, Facture, SuiviFactureService, UpdateFacture } from '../../Service/suiviFacture.service';
import { Transporteur, TransporteurService } from '../../Service/transporteur.service';
import { CommonModule, NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';


declare var bootstrap: any;

@Component({
  selector: 'app-suivi-facture',
  standalone: true,
  imports: [
    CommonModule, 
    NgFor,
    NavbarComponent, 
    SidebarComponent,
    FormsModule],
  templateUrl: './suivi-facture.component.html',
  styleUrl: './suivi-facture.component.css'
})
export class SuiviFactureComponent implements OnInit {
  factureForm: FormGroup;
  factures: Facture[] = [];
  livreur: string='';
  facturess: UpdateFacture[] = [];

  livreurs: Transporteur[] = [];
  clientName: string = '';
  clientPhone: string = '';
  description: string = '';
  location: string = '';
  amount: number = 0;
  status:string='';
  selectedLivreurId: string = '';
  currentFactureId: string | null = null;
  isEditing = false;

  isSidebarClosed = false;

  constructor(
    private factureService: SuiviFactureService,
    private transporteurService: TransporteurService,
    private fb: FormBuilder

  ) {
    this.factureForm = this.fb.group({
      status: ['', Validators.required],
      clientName: ['', Validators.required],
      clientPhone: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      amount: [0, Validators.required],
      livreur: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadFactures();
    this.loadLivreurs();
  }

  loadFactures() {
    this.factureService.getFactures().subscribe(data => {
      this.factures = data;
    });
  }

  loadLivreurs() {
    this.transporteurService.getTransporteurs().subscribe(data => {
      this.livreurs = data;
    });
  }

  openInvoiceModal() {
    this.clearForm();
    const invoiceModal = new bootstrap.Modal(document.getElementById('invoiceModal'), {
      keyboard: false
    });
    invoiceModal.show();
  }

  clearForm() {
    this.clientName = '';
    this.clientPhone = '';
    this.description = '';
    this.location = '';
    this.amount = 0;
    this.selectedLivreurId = '';
  }

  saveInvoice() {
    const selectedLivreur = this.livreurs.find(l => l._id === this.selectedLivreurId);
    const livreurName = selectedLivreur ? `${selectedLivreur.nom} ${selectedLivreur.prenom}` : '';
    const newFacture:CreateFacture = {
      clientName: this.clientName,
      clientPhone: this.clientPhone,
      description: this.description,
      location: this.location,
      amount: +this.amount,
      livreur:  livreurName,
      status:"enStock"
    };

    this.factureService.addFacture(newFacture).subscribe(() => {
      this.loadFactures();
    });

    const invoiceModal = bootstrap.Modal.getInstance(document.getElementById('invoiceModal'));
    invoiceModal.hide();
  }

  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }



  fetchFactures(): void {
    this.factureService.getFactures().subscribe(data => {
      this.factures = data;
    });
  }

  
  
  deleteFacture(id: string): void {
    this.factureService.deleteFacture(id).subscribe(() => {
      this.fetchFactures();
    });
  }
  
  
  openEditModal(facture: Facture) {
    const selectedLivreur=facture.livreur;
    console.log("********"+selectedLivreur)

     this.currentFactureId=facture._id;
      this.clientName= facture.clientName,
      this.clientPhone= facture.clientPhone,
      this.description= facture.description,
      this.location= facture.location,
      this.amount= facture.amount,
      this.livreur=selectedLivreur,
      this.status=facture.status;
    
  
    const editModal = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    });
    editModal.show();
  }
  
  updateFacture() {
    if (!this.currentFactureId) {
      console.error('No Invoice selected for update.');
      return;
    }
    const selectedLivreur = this.livreurs.find(l => l._id === this.selectedLivreurId);
    const livreurName = selectedLivreur ? `${selectedLivreur.nom} ${selectedLivreur.prenom}` : '';

    const updatedFacture: UpdateFacture = {
     
      _id: this.currentFactureId,
      amount: this.amount.toString(),
      clientName: this.clientName,
      clientPhone: this.clientPhone,
      description: this.description,
      livreur: this.livreur,
      location:this.location,
      status:this.status
    };
  
    this.factureService.updateFacture(this.currentFactureId, updatedFacture).subscribe(() => {
      this.loadFactures();
    });
  
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();
  }

  
}
