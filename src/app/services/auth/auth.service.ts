import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private readonly http = inject(HttpClient)

  private _token:string | undefined

  constructor (){

    super('api')

    const token = localStorage.getItem(environment.localStorageKeys.token)

    if (token) {
      this._token = token  
    }

  }

  get token ():string | undefined {
    return this._token
  }



  get isAuthenticated ():boolean {
    return !!this._token // on transforme le contenue du token en booleen
  }

  
  async login(email:string, password:string, stayConnected: boolean):Promise<void>{
    const req = this.http.post<{token:string}>(
      `${this.apiUrl}/login`,
       {
        email: email,
        password:password
      } 
    )
    const res = await lastValueFrom(req)
    this.processToken(res.token, stayConnected)
   
  }

  logout():void {
    this._token = undefined
  }

  private processToken(token:string, stayConnected:boolean):void {
    const tokenExtracted = jwtDecode(token)
    console.log(tokenExtracted)

    this._token = token

    // si il choisis de rester connecter
    if (stayConnected) {
      // on verifie si il y a déjà un token
      if (localStorage.getItem(environment.localStorageKeys.token)) {
        // si oui on supprime d'abord le token 
        localStorage.removeItem(environment.localStorageKeys.token)
      }
      // et ici on les réassigne 
      localStorage.setItem(environment.localStorageKeys.token, this.token)
      
    }

  }
}
