import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from '../services/alert.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(private router: Router, private alertService: AlertService) {
    // Fetch user from backend
    this.currentUser = of(null);
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    // Call Firebase signup function
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    // Call Firebase login function
    return of(true);
  }

  public logout(): void {
    // Call Firebase logout function
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }

}
