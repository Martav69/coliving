export interface MessageHttp {
  id: number;
  sender: {
    id: number,
  } 
  receiver: {
    id:number,
  } 
  content: string
  sentDate: string
}


export interface Message {
  id: number
  senderId: number
  receiverId: number
  content: string
  sentDate: string
}


export namespace Message {
  export function fromHttp(messageHttp: MessageHttp): Message {
    return {
      id: messageHttp.id,
      senderId: messageHttp.sender.id,
      receiverId: messageHttp.receiver.id,
      content: messageHttp.content,
      sentDate: messageHttp.sentDate,
    };
  }
}


// type l'envoie dans la socket
export interface MessageInput {
    senderId : number
    receiverId: number
    content: string
}


