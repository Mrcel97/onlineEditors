import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './../services/chat.service';
import { Idle, NotIdle } from 'idlejs/dist';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chatContent: string;
  public message: string;
  userUID: String = '';

  constructor(
    public router: Router, 
    public chatService: ChatService
  ) { }

  ngOnInit() {
    //this.loadUserMode();
    this.chatService.initializeWebSocketConnection().subscribe( (message) => {
      if (this.message !== message) {
        this.message = message; // TODO: merge the diferences
      } else {
        this.message = message;
      }
    });
  }

  sendMessage() {
    this.userUID != '' ? this.chatService.sendMessage(this.message) : null;
  }

  loadUserMode() {
    new Idle().whenNotInteractive().within(3, 1000).do(() => {
      console.log('User inactive')
      this.chatService.sendMessage(this.message);
    }).start();
    new NotIdle().whenInteractive().within(1, 1000).do(() => {
      console.log('User active')
      this.chatService.saveSendMessage(this.message);
    }).start();
  }

  updateUserUID(status: String) {
    this.userUID = status;
    this.chatService.setUserUID(this.userUID);
  }
}
