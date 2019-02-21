import { FirebaseUser } from './../../assets/model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workspace } from 'src/assets/model/workspace';
import { File } from 'src/assets/model/file';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private user: FirebaseUser;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  buildWorkspace(name: string) {
    if (!this.user) { 
      alert('You must be logged to use chatComponent'); 
      return; 
    }
    var ws = new Workspace(this.user.uid, name, this.user, this.user, [this.user], []);
    // TODO: POST to DB
    this.router.navigate(['chat', this.user.displayName.split(' ').join('_'), name]);
  }

  updateUser(user: FirebaseUser) {
    this.user = user;
  }

}
