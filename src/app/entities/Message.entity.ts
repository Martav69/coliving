export interface MessageHttp {
  id: number;
  sender: string; 
  receiver: string;
  content: string
  sentDate: string;
}


export interface Message {
  id: number
  senderId: string
  receiverId: string
  content: string
  sentDate: string
}


export namespace Message {
  export function fromHttp(messageHttp: MessageHttp): Message {
    return {
      id: messageHttp.id,
      senderId: messageHttp.sender,
      receiverId: messageHttp.receiver,
      content: messageHttp.content,
      sentDate: messageHttp.sentDate
    };
  }
}

// type l'envoie dans la socket
export interface MessageInput {
    senderId : number
    receiverId: number
    content: string
}


