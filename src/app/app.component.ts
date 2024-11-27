import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from './services/AuthService/auth.service';
import {TUser} from '../types/TUser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'modszert-frontend';
  profile: TUser | undefined | null;

  constructor(private authServiceService: AuthService) {
  }

  ngOnInit() {
    this.authServiceService.fetchProfile();
    this.authServiceService.profile$.subscribe((profile) => {
      console.log(profile);
      this.profile = profile;
    });
  }
}
