import { Component, OnInit } from '@angular/core';
import sdk from '@stackblitz/sdk'

import { project } from './project/project-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stack-bitz',
  templateUrl: './stack-bitz.component.html',
  styleUrls: ['./stack-bitz.component.scss']
})
export class StackBitzComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    sdk.embedProject('editor', project)
  }

}
