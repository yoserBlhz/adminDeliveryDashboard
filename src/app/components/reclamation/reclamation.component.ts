import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Reclamation, ReclamationService } from '../../Service/reclamation.service';
import { CommonModule, NgFor } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reclamation',
  standalone: true,
  imports: [
    CommonModule, 
    NgFor,
     NavbarComponent, 
     DashboardComponent,
      SidebarComponent,
      RouterOutlet],
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent implements OnInit{

  isSidebarClosed = false;

  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

openSettingsModal() {
throw new Error('Method not implemented.');
}

  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {

    this.reclamationService.getReclamations().subscribe((data) => {
      this.reclamations = data;
    });

  }

}
