import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbarlogin',
  standalone: true,
  imports: [],
  templateUrl: './navbarlogin.component.html',
  styleUrl: './navbarlogin.component.css'
})
export class NavbarloginComponent implements OnInit
{
 
  isDropdownOpen = false;
  constructor(
  ) 
  {
  
  }

  ngOnInit(): void {
    
   

   
  }
 
  
 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

