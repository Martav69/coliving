import { User, UserHttp } from "./User.entity";


export interface MessageHttp {
  id: number;
  sender_id: UserHttp;  
  receiver_id: UserHttp;   
  content: string;
  sent_date: string; 
}


export interface Message {
  id: number;
  sender: User;
  receiver: User; 
  content: string;
  sentDate: Date;
}


export namespace Message {
  export function fromHttp(messageHttp: MessageHttp): Message {
    return {
      id: messageHttp.id,
      sender: User.fromHttp(messageHttp.sender_id),
      receiver: User.fromHttp(messageHttp.receiver_id),
      content: messageHttp.content,
      sentDate: new Date(messageHttp.sent_date)
    };
  }
}


