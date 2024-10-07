import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { from, NEVER } from 'rxjs'
import { AuthService } from '../../services/auth/auth.service'

const API_URLS_NOT_NEED_TOKEN = ['login', 'register', 'reset-password'];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si requete sur API login, on laisse passer sans le jeton
  if(checkAPIUrlNotNeedToken(req.url)) return next(req);

  // Si authentifié, on ajoute le jeton
  if(authService.isAuthenticated) {
    const token = authService.token;
    return next(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }));
  }

  // Sinon, on redirige vers la page de connexion
  authService.logout();
  router.navigateByUrl('/connexion');

  // Equivalent to Throw error
  return from(NEVER);
};

function checkAPIUrlNotNeedToken(url: string): boolean {
  // Some va renvoyer un boolean si au moins une valeur du tableau correspond à la condition
  return API_URLS_NOT_NEED_TOKEN.some((apiUrl) => url.includes(apiUrl));
}
