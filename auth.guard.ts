import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authS = inject(AuthService);
  const router = inject(Router);

  if (authS.LogCheck()) {
    return true;
  }
  router.navigate(['/login']);

  return false;
};
