import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

import  { backendURL } from '../../assets/configs/backendConfig';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private serverUrl = backendURL;
  private title = 'WebSockets chat';
  private stompClient;

  constructor(
    public router: Router
  ) {
    this.initializeWebSocketConnection();
  }

  ngOnInit() {
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }
}
