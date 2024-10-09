import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Message, MessageHttp } from '../../entities/Message.entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService {

  private readonly http = inject(HttpClient)

  constructor() {
    super('api/messages')
   }

   async listForSenderAndReceiver(senderId:number, receiverId:number):Promise<Message[]>{

    const params = new HttpParams({fromObject: {
      senderId: senderId,
      receiverId: receiverId
    }})

    const req = this.http.get<{member: MessageHttp[]}>(this.apiUrl,{
      params: params
    })

    const res = await lastValueFrom(req)

    return res.member.map(message => Message.fromHttp(message))
    
   }
}
