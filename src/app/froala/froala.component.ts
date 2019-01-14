import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-froala',
  templateUrl: './froala.component.html',
  styleUrls: ['./froala.component.scss']
})
export class FroalaComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

}
