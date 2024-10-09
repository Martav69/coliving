import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../entities/User.entity';
import { UsersService } from '../../services/users/users.service';
import { MessagesService } from '../../services/messages/messages.service';
import { Message, MessageInput } from '../../entities/Message.entity';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-instant-chat',
  templateUrl: './instant-chat.component.html',
  styleUrls: ['./instant-chat.component.scss'],
  imports:[FormsModule, ReactiveFormsModule, NgIf, NgFor],
  standalone: true
})
export class InstantChatComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly usersService = inject(UsersService)
  private readonly messagesService = inject(MessagesService)


  private socket: WebSocket;
  messages: Message[]
  receiver: User
  form: FormGroup

  private senderId : number
  private receiverId : number

  async ngOnInit(): Promise<void> {

    // on récupère les id dans les query param entre parseInt pour transformer la string en number
    this.senderId = parseInt(this.route.snapshot.queryParamMap.get('s'))
    this.receiverId = parseInt(this.route.snapshot.queryParamMap.get('r'))

    this.receiver = await this.usersService.getById(this.receiverId)
    this.messages = await this.messagesService.listForSenderAndReceiver(this.senderId, this.receiverId)

    this.form = new FormGroup({
      content: new FormControl(undefined, [
        Validators.required
      ])
    })

    this.initSocket()

  }

  private initSocket():void{

    this.socket = new WebSocket(`ws://${environment.wsAddress}:${environment.wsPort}`);

    // Lorsque la connexion est ouverte
    this.socket.onopen = (event) => {
      console.log('WebSocket is connected.');
      
      // Ici on devrais faire un premier envoie avec le jeton

    };

    // Lorsqu'un message est reçu du serveur
    this.socket.onmessage = (event) => {
      console.log('Message received: ', event.data);
    };

    this.socket.onerror = (event) => {
      console.error('Une erreur est survenue, ', event )
    }

    this.socket.onclose = () => {
      // to do desactiver l'input d'envoie de messages
    }

  }

  onClickSendMessage(){
    if (this.form.valid) {
      const {content} = this.form.value
      const message: MessageInput = {
        senderId: this.senderId,
        receiverId: this.receiverId,
        content: content
      }

      this.socket.send(JSON.stringify({
        type: 'conversation.message.created',
        data: message
      }))
    }
  }
}