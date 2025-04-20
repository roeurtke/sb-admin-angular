import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  permissions?: string[];
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/api/login/`;
  private readonly refreshTokenUrl = `${environment.apiUrl}/api/refresh-token/`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userPermissionsSubject = new BehaviorSubject<string[]>([]);
  private tokenExpirationTimer: any;
  
  // Public observables
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userPermissions$ = this.userPermissionsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkInitialAuthState();
    this.scheduleTokenRefresh();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        this.storeAuthData(response.token, response.permissions || []);
        this.isAuthenticatedSubject.next(true);
        this.userPermissionsSubject.next(response.permissions || []);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  logout(): void {
    this.clearAuthData();
    this.isAuthenticatedSubject.next(false);
    this.userPermissionsSubject.next([]);
    this.router.navigate(['/login']);
  }

  // Synchronous check
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value && !!this.getToken();
  }

  // Permission check methods
  hasPermission(permission: string): boolean {
    return this.userPermissionsSubject.value.includes(permission);
  }

  checkPermissions(requiredPermissions: string[]): Observable<boolean> {
    return this.userPermissions$.pipe(
      map(userPermissions => {
        if (requiredPermissions.length === 0) return true;
        return requiredPermissions.every(perm => userPermissions.includes(perm));
      })
    );
  }

  // Refresh token method
  refreshToken(): Observable<LoginResponse> {
    const token = this.getToken();
    if (!token) {
      this.logout();
      return new Observable();
    }

    return this.http.post<LoginResponse>(this.refreshTokenUrl, { token }).pipe(
      tap(response => {
        this.storeAuthData(response.token, response.permissions || []);
        this.isAuthenticatedSubject.next(true);
        this.userPermissionsSubject.next(response.permissions || []);
      })
    );
  }

  // Schedule token refresh
  private scheduleTokenRefresh(): void {
    const token = this.getToken();
    if (!token) return;

    const expirationDate = this.getTokenExpirationDate(token);
    if (!expirationDate) return;

    const now = new Date().getTime();
    const refreshTime = expirationDate.getTime() - now - 60000; // Refresh 1 minute before expiration

    if (refreshTime > 0) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = setTimeout(() => {
        this.refreshToken().subscribe();
      }, refreshTime);
    }
  }

  // Get token expiration date
  private getTokenExpirationDate(token: string): Date | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.exp) return null;
      return new Date(payload.exp * 1000);
    } catch (e) {
      return null;
    }
  }

  // Private methods
  private checkInitialAuthState(): void {
    const token = localStorage.getItem('auth_token');
    const permissions = JSON.parse(localStorage.getItem('auth_permissions') || '[]');
    this.isAuthenticatedSubject.next(!!token);
    this.userPermissionsSubject.next(permissions);
    this.scheduleTokenRefresh();
  }

  private storeAuthData(token: string, permissions: string[]): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_permissions', JSON.stringify(permissions));
    this.scheduleTokenRefresh(); // Reschedule token refresh
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_permissions');
    clearTimeout(this.tokenExpirationTimer);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}