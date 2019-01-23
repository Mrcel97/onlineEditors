import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { FirebaseUser } from '../../assets/model/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: FirebaseUser;
  logged: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe( user => {
      this.user = user;
    } );
  }

  login() {
    this.authService.loginWithGithub();
  }

  logout() {
    this.authService.logout();
  }
}
