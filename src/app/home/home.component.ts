import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirebaseUser } from './../../assets/model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workspace } from '../../assets/model/workspace';
import { httpOptions } from '../../assets/model/httpOptions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private user: FirebaseUser;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  buildWorkspace(name: string) {
    if (!this.user) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    var ws = new Workspace(this.user.uid, name, this.user, this.user, [this.user], []);
    this.http.post<Workspace>('http://localhost:8080/api/workspaces', ws, httpOptions).subscribe(
      data => {
        console.log('Workspace successfully created ', data);
        this.router.navigate(['chat', this.user.displayName.split(' ').join('_'), name]);
      },
      err => {
        console.error('Error while creating the resource ', err);
      }
    );
  }

  updateUser(user: FirebaseUser) {
    this.user = user;
  }
}
