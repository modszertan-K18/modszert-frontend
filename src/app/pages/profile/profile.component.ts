import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/AuthService/auth.service';
import {TUser} from '../../../types/TUser';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
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
