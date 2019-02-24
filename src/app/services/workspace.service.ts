import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Workspace } from '../../assets/model/workspace';
import { FirebaseUser } from '../../assets/model/user';
import { httpOptions, httpWorkspaceOptions } from '../../assets/model/httpOptions'

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  localWorkspaces: Subject<Array<Workspace>> = new Subject();
  private user: FirebaseUser;

  constructor(
    private router: Router,
    public http: HttpClient,
  ) { }

  createWorksapace(name: string, owner: FirebaseUser) {
    if (!owner) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    this.user = owner;
    var ws = new Workspace(name, this.user, this.user, [this.user], []);
    this.http.post<Workspace>('http://localhost:8080/api/workspaces', ws, httpOptions).subscribe(
      data => {
        console.log('Workspace successfully created ', data);
        this.loadWorkspaces(this.user.uid)
      },
      err => {
        console.error('Error while creating the resource ', err);
      }
    );
  }

  loadWorkspaces(owner: string) { // TODO: Add findByOwnerId() on Backend
    if (!owner || owner === null) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    this.http.get('http://localhost:8080/api/workspaces/', httpWorkspaceOptions)
      .pipe(
        map( (data:any) => {
          return data._embedded.workspaces as Workspace[];
        })
      )
      .subscribe( workspaces => {
        this.localWorkspaces.next(workspaces);
      });
  }

  loadWorkspace(id: string) {
    this.router.navigate(['chat', id]);
  }

}
