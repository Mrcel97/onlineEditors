import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { BehaviorSubject, Subject } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import  { backendURL } from '../../assets/configs/backendConfig';

var ENCODING = 'utf8';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private serverUrl = backendURL;
  private stompClient;
  private message: BehaviorSubject<string> = new BehaviorSubject('');
  private messageContent: string;

  constructor() {
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl + '?user=87tr28rgf80d2');
    this.stompClient = Stomp.over(ws);
    // this.stompClient.debug = false;

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe("/chat", (message) => {
        if(message.body || message.body === "") {
          this.receiveMessage(message);
        }
      });
    });
    return this.message;
  }

  sendMessage(message) {
    this.messageContent = message;
    if(!message) message = '\0';
    this.stompClient.send("/app/send/message", {'UserID': '87tr28rgf80d2'}, message);  // TODO: Use User ID
  }

  saveSendMessage(message) {
    if(!message) message = '\0';
    localStorage.setItem('sndMessage', message);
  }

  loadMessages() { // EXTRA FEATURE: Save not send written text locally so we don't lose it if we refresh
    localStorage.length > 0 ? this.message.next(localStorage.getItem('sndMessage')) : null;
    localStorage.clear();
  }

  private receiveMessage(message) {
    if (message !== this.messageContent) {
      this.message.next(message.body);
    }
    
    // TODO: Future control, check if the user stop writing to load received changes
    // localStorage.setItem('rcvMessage', message);
  }
}
