import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from '../users/users.service';
import { UserJWT, UserJWTHttp } from '../../entities/User.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private readonly usersService = inject(UsersService)
  private readonly http = inject(HttpClient)
  // transformation token en observable / convention avec dollar à la fin
  private token$:BehaviorSubject<string | undefined> = new BehaviorSubject(undefined)

  constructor (){

    super('api')

    const token = localStorage.getItem(environment.localStorageKeys.token)

    if (token) {
      this.processToken(token, false)
    }

  }

  get token ():string | undefined {
    return this.token$.getValue()
  }

  // on le déclare en observable pour qu'il soit en readonly 
  selectToken(): Observable<string |undefined>{
    return this.token$.asObservable() // readonly
  }

  // ici on se plug sur token, lorsqu'une valeur transite on la récupère et transorme en boolean
  selectIsAuthenticated(): Observable<boolean>{
    return this.token$.pipe(map(token => !!token))
  }



  get isAuthenticated ():boolean {
    return !!this.token // on transforme le contenue du token en booleen
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
    this.token$.next(undefined)
    localStorage.removeItem(environment.localStorageKeys.token)
    this.usersService.userJWT = undefined
    
  }

  private processToken(token:string, stayConnected:boolean):void {
    const tokenExtracted: UserJWTHttp = jwtDecode(token)
    this.usersService.userJWT = UserJWT.fromHttp(tokenExtracted)

    this.token$.next(token)

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
