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
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userPermissionsSubject = new BehaviorSubject<string[]>([]);
  
  // Public observables
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userPermissions$ = this.userPermissionsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkInitialAuthState();
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
    return this.isAuthenticatedSubject.value;
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

  // Private methods
  private checkInitialAuthState(): void {
    const token = localStorage.getItem('auth_token');
    const permissions = JSON.parse(localStorage.getItem('auth_permissions') || '[]');
    this.isAuthenticatedSubject.next(!!token);
    this.userPermissionsSubject.next(permissions);
  }

  private storeAuthData(token: string, permissions: string[]): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_permissions', JSON.stringify(permissions));
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_permissions');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}