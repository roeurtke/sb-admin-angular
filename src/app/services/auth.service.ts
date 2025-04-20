// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api/login/`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  // Public observable for authentication state
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize authentication state from storage
    this.checkInitialAuthState();
  }

  /**
   * Login user with credentials
   * @param username 
   * @param password 
   * @returns Observable with login response
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { username, password }).pipe(
      tap((response: any) => {
        // Store token and update state
        this.storeAuthData(response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.clearAuthData();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is authenticated
   */
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Private helper methods

  private checkInitialAuthState(): void {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }

  private storeAuthData(token: string): void {
    localStorage.setItem('auth_token', token);
    // Add other user data to storage if needed
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    // Clear other user data if stored
  }

  /**
   * Get auth token from storage
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}