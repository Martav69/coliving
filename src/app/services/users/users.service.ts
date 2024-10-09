import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User, UserHttp, UserJWT } from '../../entities/User.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService{

  private readonly http = inject(HttpClient)
  private userJWT$:BehaviorSubject<UserJWT|undefined> = new BehaviorSubject(undefined)

  constructor (){
    super('api/users')
  }
  

  selectUserJWT(): Observable<UserJWT|undefined>{

    return this.userJWT$.asObservable();

  }

  get userJWT():UserJWT|undefined{
    
    return this.userJWT$.getValue()

  }

  set userJWT(value: UserJWT | undefined) {
    this.userJWT$.next(value)
  }

  async list(): Promise<User[]>{
    const req = this.http.get<{member: UserHttp[]}>(this.apiUrl)
    const res = await lastValueFrom(req)

    return res.member.map(userHttp => User.fromHttp(userHttp) )

  }

  async getById(id: number): Promise<User>{
    const req = this.http.get<UserHttp>(`${this.apiUrl}/${id}`)
    const res = await lastValueFrom(req)

    console.log(res)

    return User.fromHttp(res) 

  }

}
