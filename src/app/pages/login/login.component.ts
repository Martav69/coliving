import { Component, inject } from '@angular/core';
import { LoginFormComponent, LoginFormContent } from "../../components/login-form/login-form.component";
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  errMsg?: string

  async onSubmitLogin(creds: LoginFormContent): Promise<void> {


    try {
      // on renvoie le login et le pseudo dans le authservice
      await this.authService.login(creds.pseudo, creds.password)
      this.router.navigateByUrl('/')

    }
    catch (e:unknown) {
      //method rapide pas forcément secure mais ok
      // this.errMsg = e as string

      this.errMsg = typeof e === 'string' ? e : "An Error occured"
    }
  }

}
