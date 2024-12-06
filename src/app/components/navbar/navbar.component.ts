import {Component, OnInit} from '@angular/core';
import {TUser} from '../../../types/TUser';
import {AuthService} from '../../services/AuthService/auth.service';
import {NgIf} from '@angular/common';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  profile: TUser | undefined | null;

  constructor(private authServiceService: AuthService, private http : HttpClient, private router: Router) {
  }
  ngOnInit() {
    this.authServiceService.fetchProfile();
    this.authServiceService.profile$.subscribe((profile) => {
      this.profile = profile;
    });
  }
  logout() {
    this.http.post(`${environment.backendBaseUrl}/auth/logout`, {}, {
      withCredentials: true
    }).subscribe({
      next: (response: any) => {
         console.log('Logout successful', response);
         this.authServiceService.fetchProfile();
      },
      error: (error) => {
        console.error('logout failed', error);
      }
    });
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }


}
