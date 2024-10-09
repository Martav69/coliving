export interface MessageHttp {
  id: number;
  sender_id: { id : number}; 
  receiver_id: { id : number};
  content: string
  sent_date: string;
}


export interface Message {
  id: number
  senderId: { id : number} 
  receiverId: { id : number}
  content: string
  sentDate: string
}


export namespace Message {
  export function fromHttp(messageHttp: MessageHttp): Message {
    return {
      id: messageHttp.id,
      senderId: messageHttp.sender_id,
      receiverId: messageHttp.receiver_id,
      content: messageHttp.content,
      sentDate: messageHttp.sent_date
    };
  }
}

// type l'envoie dans la socket
export interface MessageInput {
    senderId : number
    receiverId: number
    content: string
}


