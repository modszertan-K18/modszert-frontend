import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';
import {TUser} from '../../../types/TUser';
import {environment} from '../../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private profileSubject: BehaviorSubject<TUser | undefined | null> = new BehaviorSubject<TUser | undefined | null>(undefined);
  public profile$: Observable<TUser | undefined | null> = this.profileSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.fetchProfile();
      }
    });
  }

  fetchProfile(): void {
    this.http.get<TUser>(`${environment.backendBaseUrl}/profile/my-profile`, {
      withCredentials: true
    })
      .pipe(
        map((data) => {
          this.profileSubject.next(data);
        }),
        catchError((error) => {
          console.error(error);
          this.profileSubject.next(undefined);
          return [];
        })
      )
      .subscribe();
  }
}
