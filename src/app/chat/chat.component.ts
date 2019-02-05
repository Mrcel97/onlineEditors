import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import  { backendURL } from '../../assets/configs/backendConfig';

var ENCODING = 'utf8';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private serverUrl = backendURL;
  private messageBuffer: Buffer;
  private stompClient;

  public message: String = '';

  constructor(public router: Router) {
    this.initializeWebSocketConnection();
    this.messageBuffer = Buffer.from('', ENCODING);
  }

  ngOnInit() {
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = false;

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe("/chat", (message) => {
        if(message.body || message.body === "") {
          this.message = message.body;
        }
      });
    });
  }

  sendMessage(message) {
    this.appendToBuffer(message);

    if(!message) message = '\0';
    this.stompClient.send("/app/send/message" , {}, message);
  }

  appendToBuffer(message: string) {
    this.messageBuffer = Buffer.from(message, ENCODING);
    
    if(this.messageBuffer.length > 4) {
      // TODO
    }
  }
}
