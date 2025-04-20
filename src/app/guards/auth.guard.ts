import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

// Helper function (now properly defined)
const redirectToLogin = (router: Router, returnUrl: string): boolean => {
  router.navigate(['/login'], { 
    queryParams: { returnUrl },
    queryParamsHandling: 'merge' // Preserves existing query params
  });
  return false;
};

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermissions = childRoute.data?.['permissions'] as string[] || [];

  if (!authService.isAuthenticated) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

  if (requiredPermissions.length > 0 && 
      !authService.hasPermission(requiredPermissions[0])) {
    router.navigate(['/access-denied']);
    return false;
  }

  return true;
};
