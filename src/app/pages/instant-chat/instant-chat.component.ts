import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instant-chat',
  templateUrl: './instant-chat.component.html',
  styleUrls: ['./instant-chat.component.scss']
})
export class InstantChatComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)

  private socket: WebSocket;

  private senderId : number
  private receiverId : number

  ngOnInit(): void {

    // on récupère les id dans les query param entre parseInt pour transformer la string en number
    this.senderId = parseInt(this.route.snapshot.queryParamMap.get('s'))
    this.receiverId = parseInt(this.route.snapshot.queryParamMap.get('r'))

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
}