import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseUser } from './../../assets/model/user';
import { WorkspaceService } from './../services/workspace.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Workspace } from 'src/assets/model/workspace';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public wsName: string;
  private user: FirebaseUser;
  public workspaces: Workspace[];
  validatingForm: FormGroup;

  constructor(
    public router: Router,
    private workspaceService: WorkspaceService,
  ) {
    this.workspaceService.localWorkspaces.subscribe( workspaces => {
      this.workspaces = workspaces;
    });
  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      required: new FormControl(null, Validators.required)
    });
  }

  createWorkspace() {
    if (!this.wsName) {
      alert('Complete all the required fields');
      return;
    }
    this.workspaceService.createWorksapace(this.wsName, this.user);
  }

  updateUser(user: FirebaseUser) {
    this.user = user;
    (user != null) ? this.workspaceService.loadWorkspaces(this.user.uid) : null;
  }

  get input() { return this.validatingForm.get('required'); }
}
