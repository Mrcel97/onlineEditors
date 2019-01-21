import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { StackBlitzService } from '../services/stack-blitz.service';

// Project Imports
import { Workspace } from 'src/assets/model/workspace';

@Component({
  selector: 'app-stack-bitz',
  templateUrl: './stack-bitz.component.html',
  styleUrls: ['./stack-bitz.component.scss']
})
export class StackBitzComponent implements OnInit {
  virtualMachine: any = null; // TODO: Find and set the Type. Possibilities { 'StackBlitzComponent', 'more...' }
  workspace: Workspace;

  constructor(
    public ideService: StackBlitzService,
    public router: Router
  ) { }

  ngOnInit() {
    this.ideService.createWorkspace();
  }

  createFile() {
    console.log('Creating File');
    var name = 'sampleFile' // TODO
    var language = 'ts' // TODO

    this.ideService.createFile(name, language);
  }

  getSnapshot() {
    this.ideService.getSnapshot();
  }

  receiveUpdates() {
    this.ideService.receiveUpdates();
  }

  refresh() {
    this.ideService.refresh();
  }
}
