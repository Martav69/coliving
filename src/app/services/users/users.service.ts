import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserJWT } from '../../entities/User.entity';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userJWT$:BehaviorSubject<UserJWT|undefined> = new BehaviorSubject(undefined)

  selectUserJWT(): Observable<UserJWT|undefined>{

    return this.userJWT$.asObservable();

  }

  set userJWT(value: UserJWT | undefined) {
    this.userJWT$.next(value)
  }

}
