import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../Service/dashboard.service';
import { ReclamationService } from '../../Service/reclamation.service';
import { TransporteurService } from '../../Service/transporteur.service';
import { OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { SuiviFactureService } from '../../Service/suiviFacture.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Fixed typo: styleUrl -> styleUrls
})
export class DashboardComponent implements OnInit, AfterViewInit {
  isSidebarClosed = false;

  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }
  private baseUrl = 'http://localhost:3000/facturenew';

  @Output() settingsEvent = new EventEmitter<void>();

  totalInvoices: number | undefined;
  totalLivreurs: number | undefined;
  totalComplaints: number | undefined;
  totalCompleted: number | undefined;
  totalFailed: number | undefined;
  totalPickedUp: number | undefined;
  totalenStock: number | undefined;
  totalReteurned: number | undefined;

  livreurFactureCounts: { livreurNom: string, count: number }[] = [];

  constructor(
    private dashboardService: DashboardService,
    private reclamationService: ReclamationService,
    private transporteurService: TransporteurService,
    private factureService: SuiviFactureService
  ) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  ngAfterViewInit(): void {
  }

  emitSettingsEvent() {
    this.settingsEvent.emit();
  }

  loadCounts(): void {
    forkJoin({
      totalLivreurs: this.transporteurService.countAllLivreurs(),
      totalComplaints: this.reclamationService.countAll(),
      totalInvoices: this.dashboardService.countAll(),
      totalenStock: this.dashboardService.countByStatus('enStock'),
      totalReteurned: this.dashboardService.countByStatus('Returned'),
      totalPickedUp: this.dashboardService.countByStatus('PickedUp'),
      totalFailed: this.dashboardService.countByStatus('Failed'),
      totalCompleted: this.dashboardService.countByStatus('Completed')
    }).subscribe({
      next: ({ totalLivreurs, totalComplaints, totalInvoices, totalenStock, totalReteurned, totalPickedUp, totalFailed, totalCompleted }) => {
        this.totalLivreurs = totalLivreurs;
        this.totalComplaints = totalComplaints;
        this.totalInvoices = totalInvoices;
        this.totalenStock = totalenStock;
        this.totalReteurned = totalReteurned;
        this.totalPickedUp = totalPickedUp;
        this.totalFailed = totalFailed;
        this.totalCompleted = totalCompleted;

        // Create charts after data is loaded
        this.createPerformanceChart();
        this.loadLivreurs();
      },
      error: (error: any) => {
        console.error('Error fetching counts', error);
      }
    });
  }

  createPerformanceChart() {
    const ctx = (document.getElementById('performanceChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'enStock', 'Failed', 'Returned', 'PickedUp'],
          datasets: [{
            label: 'Performance',
            data: [this.totalCompleted, this.totalenStock, this.totalFailed, this.totalReteurned, this.totalPickedUp],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8', '#91B3FA'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  }

  loadLivreurs(): void {
    this.transporteurService.getTransporteurs().subscribe(
      (livreurs: any[]) => {
        const livreurNames = livreurs.map(livreur => livreur.nom + ' ' + livreur.prenom);

        livreurNames.forEach(livreur => {
          this.factureService.countByLivreur(livreur).subscribe(
            (count: number) => {
              this.livreurFactureCounts.push({ livreurNom: livreur, count });
            },
            (error: any) => {
              console.error(`Error fetching count for ${livreur}`, error);
            }
          );
        });
      },
      (error: any) => {
        console.error('Error fetching livreurs', error);
      }
    );
  }
}
  /*createSalesChart() {
    const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }*/

 /* createPerformanceChart() {
    const ctx = (document.getElementById('performanceChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Pending', 'In Progress', 'On Hold'],
          datasets: [{
            label: 'Performance',
            data: [300, 50, 100, 20],
            backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  }
*/