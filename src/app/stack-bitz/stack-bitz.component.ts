import { Component, OnInit } from '@angular/core';
import sdk from '@stackblitz/sdk'

import { Router } from '@angular/router';

// Project Imports
import { project } from './project/project-info';
import { project2 } from './project/project-info2';
import { connectionError } from './project/error';
import { Workspace, workspaceFactory } from 'src/assets/model/workspace';

@Component({
  selector: 'app-stack-bitz',
  templateUrl: './stack-bitz.component.html',
  styleUrls: ['./stack-bitz.component.scss']
})
export class StackBitzComponent implements OnInit {
  virtualMachine: any = null; // TODO: Find and set the Type. Possibilities { 'StackBlitzComponent', 'more...' }
  workspace: Workspace;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    sdk.embedProject('editor', project, {
      openFile: 'sampleProject.ts'
    }).then( vm => {
      this.virtualMachine = vm;
    })
  }

  vmReady() {
    if (this.virtualMachine == null) {
      throw new TypeError;
    }
  }

  createFile() {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!')
    }

    this.virtualMachine.applyFsDiff({
      create: {
        'sampleProject.ts': `// This file was generated in real time using the StackBlitz Virtual Machine.`
      },
      destroy: ['']
    });
  }

  getSnapshot() {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!');
    }
    
    this.virtualMachine.getFsSnapshot().then(
      snapshot => {
        this.workspace = workspaceFactory(snapshot);
        console.log(this.workspace);
      }
    );
  }

  refresh() {
    console.log(project);
    sdk.embedProject('editor', project);
  }
}
