import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // User is logged in, so return true
    return true;
  } else {
    // No token, redirect to login page
    router.navigate(['/login']);
    return false;
  }
};
