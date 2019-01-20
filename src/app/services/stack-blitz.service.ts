import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk'

// Project Imports
import { project } from '../../assets/projects/project-info';
import { connectionError } from '../../assets/errors/error';
import { Workspace, workspaceFactory } from 'src/assets/model/workspace';

@Injectable({
  providedIn: 'root'
})
export class StackBlitzService {
  virtualMachine: any = null; // TODO: Find and set the Type. Possibilities { 'StackBlitzComponent', 'more...' }
  workspace: Workspace;

  constructor() { }

  createWorkspace() {
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

  createFile(name: string, language: string) {
    try {
      this.vmReady();
    } catch (error) {
      if (error instanceof(TypeError)) {
        return console.error(connectionError);
      }
      return console.error('Unexpected error!')
    }

    var file_name = name + '.' + language

    this.virtualMachine.applyFsDiff({
      create: {
        [file_name]: `// This file was generated in real time using the StackBlitz Virtual Machine.`
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
