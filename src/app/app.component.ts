import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Observable } from 'rxjs';
import { UsersService } from './services/users/users.service';
import { UserJWT } from './entities/User.entity';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly usersService = inject(UsersService)

  isAuthenticated$:Observable<boolean> = this.authService.selectIsAuthenticated()
  userJWT$:Observable<UserJWT> = this.usersService.selectUserJWT()

  

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('connexion')
    
  }

  
}