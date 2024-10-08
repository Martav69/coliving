import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const noAuthGuard: CanActivateFn = () => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.isAuthenticated){
    return router.navigateByUrl('/')
  }
  return true;
};
