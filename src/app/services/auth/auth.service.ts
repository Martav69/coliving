import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient)

  private _token:string | undefined

  get token ():string | undefined {
    return this._token
  }



  get isAuthenticated ():boolean {
    return !!this._token // on transforme le contenue du token en booleen
  }

  
  async login(email:string, password:string):Promise<void>{
    const req = this.http.post<{access_token:string}>(
      'https://localhost:8000/login',
       {
        email: email,
        password:password
      } 
    )
    const res = await lastValueFrom(req)
    this._token = res.access_token
  }

  logout():void {
    this._token = undefined
  }
}
