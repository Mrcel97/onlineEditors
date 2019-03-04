import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Idle, NotIdle } from 'idlejs/dist';

import { Workspace } from 'src/assets/model/workspace';
import { WorkspaceService } from './../../services/workspace.service';
import { ChatService } from './../../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  public chatContent: string;
  public message: string;
  public workspace: Workspace;
  private roomID: string;
  userUID: string = '';

  constructor(
    public router: Router, 
    public chatService: ChatService,
    public workspaceService: WorkspaceService,
    private route: ActivatedRoute
  ) {
    var params = this.route.snapshot.paramMap.get("workspace")
    if (params) { // POST MODE
      this.chatService.setRoomID(params);
      this.roomID = params;
    }
  }

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

  askForWrite() {
    this.roomID ? this.workspaceService.askForWrite(this.userUID, this.roomID) : null;
  }

  updateUserUID(status: string) {
    this.userUID = status;
    this.chatService.setUserUID(this.userUID);
  }
}
