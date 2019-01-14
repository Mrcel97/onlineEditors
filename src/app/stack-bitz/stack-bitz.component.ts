import { Component, OnInit } from '@angular/core';
import sdk from '@stackblitz/sdk'

import { Router } from '@angular/router';

// Project Imports
import { project } from './project/project-info';
import { project2 } from './project/project-info2';
import { connectionError } from './project/error';

@Component({
  selector: 'app-stack-bitz',
  templateUrl: './stack-bitz.component.html',
  styleUrls: ['./stack-bitz.component.scss']
})
export class StackBitzComponent implements OnInit {
  virtualMachine: any; // TODO: Find and set the Type. Possibilities { 'StackBlitzComponent', 'more...' }

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

  logSDK() {
    if (!this.virtualMachine) {
      console.error(connectionError)
      return -1;
    }

    this.virtualMachine.applyFsDiff({
      create: {
        'sampleProject.ts': `// This file was generated in real time using the StackBlitz Virtual Machine.`
      },
      destroy: ['']
    });
  }

  refresh() {
    console.log(project);
    sdk.embedProject('editor', project2);
  }
}
