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
  private stompClient;
  private message: BehaviorSubject<string> = new BehaviorSubject('');
  private messageContent: string;
  private userUID: String = 'None';
  private roomID: String = '';

  constructor() {
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(backendURL);
    this.stompClient = Stomp.over(ws);
    // this.stompClient.debug = false;

    this.stompClient.connect({'UserID': this.userUID}, () => {
      this.stompClient.subscribe("/chat", (message) => { // TODO: Create a STOP MESSAGE Model
        if(message.body || message.body === "") {
          message.headers.UserID != this.userUID ? this.receiveMessage(message) : null;
        }
      });
    });
    return this.message;
  }

  sendMessage(message) {
    this.messageContent = message;
    if(!message) message = '\0';
    this.stompClient.send("/app/send/message", {'UserID':this.userUID, 'room_id':this.roomID}, message);
  }

  saveSendMessage(message) {
    if(!message) message = '\0';
    localStorage.setItem('sndMessage', message);
  }

  loadMessages() { // EXTRA FEATURE: Save not send written text locally so we don't lose it if we refresh
    localStorage.length > 0 ? this.message.next(localStorage.getItem('sndMessage')) : null;
    localStorage.clear();
  }

  setUserUID(userUID: String) {
    this.userUID = userUID;
  }

  setRoomID(roomID: String) {
    this.roomID = roomID;
  }

  private receiveMessage(message) {
    if (message !== this.messageContent) {
      this.message.next(message.body);
    }
    
    // TODO: Future control, check if the user stop writing to load received changes
    // localStorage.setItem('rcvMessage', message);
  }
}
