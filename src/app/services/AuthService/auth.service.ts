import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';
import {TUser} from '../../../types/TUser';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private profileSubject: BehaviorSubject<TUser | undefined> = new BehaviorSubject<TUser | undefined>(undefined);
  public profile$: Observable<TUser | undefined | null> = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

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
          return [];
        })
      )
      .subscribe();
  }
}
