import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Idle, NotIdle } from 'idlejs/dist';

import { Workspace } from 'src/assets/model/workspace';
import { WorkspaceService } from './../../services/workspace.service';
import { ChatService } from './../../services/chat.service';
import { ToastrService } from 'ngx-toastr';

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
  public options: boolean = false;
  public requests: string[] = [];
  userUID: string = '';
  userEmail: string = '';
  userStatus: boolean = false;
  isWriter: boolean = false;
  warningInterval;

  constructor(
    public router: Router, 
    public chatService: ChatService,
    public workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    var params = this.route.snapshot.paramMap.get("workspace")
    if (params) { // POST MODE
      this.chatService.setRoomID(params);
      this.roomID = params;
    }
  }

  ngOnInit() {
    this.loadUserMode();
    this.chatService.initializeWebSocketConnection().subscribe( (message) => {
      if (this.message !== message) {
        this.message = message; // TODO: merge the diferences
      } else {
        this.message = message;
      }
    });
    this.hearWriteRequestChanges();
    this.workspaceService.localIsWriter.subscribe( status => {
      this.isWriter = status;
      status ? this.loadUserMode() : null; 
    });
  }

  sendMessage() {
    this.userUID != '' ? this.chatService.sendMessage(this.message) : null;
  }

  loadUserMode() {
    if (!this.isWriter) return;
    new Idle().whenNotInteractive().within(60, 1000).do(() => {
      this.toastr.warning('If you keep idle, in 60sec the write permission will be given to another collaborator!', 'System advertisment', {
        progressBar: true,
        timeOut: 60000,
        closeButton: true
      });
      this.warningInterval = setInterval(() => {
        this.requests.forEach(request => {
          request != this.userEmail ? this.askForWrite(request) : null;
        });
        this.toastr.info('Write permission was given to another user', 'System info', {
          progressBar: true
        });
        clearInterval(this.warningInterval);
      },61000);
    }).start();
    new NotIdle().whenInteractive().within(1, 1000).do(() => {
      clearInterval(this.warningInterval);
    }).start();
  }

  askForWrite(requestedEmail: string = this.userEmail) {
    this.roomID ? this.chatService.sendWriteRequest(this.userEmail, this.userUID, requestedEmail, this.roomID) : null;
    //this.roomID ? this.workspaceService.askForWrite(this.userUID, this.userEmail, this.roomID) : null;
  }

  showOptions(status: boolean) {
    this.options = status;
  }

  updateUserCredentials(status: string) {
    this.userUID = status[0];
    this.userEmail = status[1];
    this.userStatus = this.userUID !== '' ? true : false;
    this.chatService.setUserUID(this.userUID);
    this.workspaceService.isWriter(this.userEmail, this.roomID).subscribe(
      result => { 
        if (result) {
          this.getWriteRequests();
        }
      }
    );
  }

  private getWriteRequests() {
    this.workspaceService.getWriteRequests(this.userEmail, this.roomID).subscribe( requests => {
      this.insertIntoRequests(requests);
    }); 
  }

  private hearWriteRequestChanges() {
    this.chatService.hearWriteRequestChanges().subscribe( requests => {
      this.insertIntoRequests(requests);
      this.workspaceService.isWriter(this.userEmail, this.roomID)
    });
  }

  private insertIntoRequests(requests) {
    Object.keys(requests).forEach( request => {
      requests[request] !== 0 && !this.requests.includes(request) ? this.requests.push(request) : null;
    });
  }

  updateCollaborators(status: string) {
    this.workspaceService.addCollaborator(this.userUID, status, this.roomID);
  }
}
