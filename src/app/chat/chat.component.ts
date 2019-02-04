import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import  { backendURL } from '../../assets/configs/backendConfig';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private serverUrl = backendURL;
  private stompClient;

  public message: String = '';

  constructor(public router: Router) {
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe("/chat", (message) => {
        if(message.body || message.body === "") {
          this.message = message.body;
        }
      });
    });
  }

  sendMessage(message) {
    if(!message) message = '\0';
    this.stompClient.send("/app/send/message" , {}, message);
  }
}
