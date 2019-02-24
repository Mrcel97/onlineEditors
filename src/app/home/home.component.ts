import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseUser } from './../../assets/model/user';

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
}
