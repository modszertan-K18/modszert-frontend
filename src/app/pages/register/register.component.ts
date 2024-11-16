import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords don\'t match');
      return;
    }

    const registerData = { username: this.username, password: this.password };

    this.http.post(`${environment.backendBaseUrl}/auth/register`, registerData).subscribe({
      next: (response: any) => {
        console.log('Register successful', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Register failed', error);
      }
    })
  }
}
