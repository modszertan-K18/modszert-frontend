import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = { username: this.username, password: this.password };

    this.http.post(`${environment.backendBaseUrl}/auth/login`, loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
