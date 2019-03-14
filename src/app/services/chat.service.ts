import { httpWorkspaceOptions } from './../../../dist/onlineEditors/assets/model/httpOptions';
import { backendURL } from './../../assets/configs/backendConfig';
import { Workspace } from '../../assets/model/workspace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import  { backendSocketURL } from '../../assets/configs/backendConfig';

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
  private writeRequests: Map<string, Number>;

  constructor(public http: HttpClient) {
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(backendSocketURL);
    this.stompClient = Stomp.over(ws);
    // this.stompClient.debug = false;

    this.stompClient.connect({'UserID': this.userUID}, () => {
      this.stompClient.subscribe("/chat/" + this.roomID, (message) => { // TODO: Create a STOP MESSAGE Model
        if (message.body || message.body === "") {
          message.headers.writeRequests === true ? this.receiveRequests(message) : 
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

  sendWriteRequest(requesterID: string, userID:string, workspaceID: string){
    this.http.get<Workspace>(backendURL + '/api/workspaces/' + workspaceID, httpWorkspaceOptions)
      .subscribe( workspace => {
        if (workspace.collaborators && !workspace.collaborators.includes(requesterID)) return console.error('Not allowed to write!');
        var owner: boolean = (workspace.writer.uid == requesterID) ? true : false; // true: backend will add user
        this.stompClient.send("/app/send/request", {'owner':owner}, userID);
      });
  }

  private receiveRequests(requests) {
    this.writeRequests = requests.body;
    console.log('Requests received from WebSocket: ', this.writeRequests);
    //this.giveWriterTo(this.getMinY(this.writeRequests)[0]);
  }

  private getMinY(map: Map<string, Number>) {
    var mapMin: [string, number] = ['', new Date().getTime()];
    map.forEach( (val: number, key: string) => mapMin = (val != 0) && (mapMin[1] - val >= 0) ? [key, val] : mapMin);
    return mapMin;
  }

  private giveWriterTo(userID: string) {
    // TODO: find userID in Workspace collaborators
    // TODO: PATCH Workspace Writer with previous TODO User result.
  }
}