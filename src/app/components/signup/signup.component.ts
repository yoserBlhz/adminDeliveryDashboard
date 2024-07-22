import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarloginComponent } from "../navbarlogin/navbarlogin.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,NavbarloginComponent,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  signupusers: any[] = [];

  constructor(private fb: FormBuilder,  private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator.bind(this)]],
      password: ['', [Validators.required, this.passwordStrengthValidator]]
    });
  }

  ngOnInit(): void 
  {

    const storedUsers = localStorage.getItem('signupusers');
    if (storedUsers) {
      this.signupusers = JSON.parse(storedUsers);
    }
  }

  emailValidator(control: any) {
    const email = control.value;
    if (this.signupusers.find(user => user.email === email)) {
      return { emailTaken: true };
    }
    return null;
  }

  passwordStrengthValidator(control: any) {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#\$%\^\&*\)\(+=._-]/.test(value);

    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    if (!isValid) {
      return { strongPassword: true };
    }
    return null;
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.signupusers.push(this.signupForm.value);
      localStorage.setItem('signupusers', JSON.stringify(this.signupusers));
      this.signupForm.reset();
      this.router.navigate(['/']);
    }
  }
  
}

