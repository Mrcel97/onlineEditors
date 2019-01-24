import { Component, OnInit } from '@angular/core';

import { StackBlitzService } from '../services/stack-blitz.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  repositoryInput: boolean = false;
  repoURL: string;
  
  constructor(public stackBlitzService: StackBlitzService) { }

  ngOnInit() { }

  showRepositoryInput() {
    this.repositoryInput = (this.repositoryInput) ? false : true;
  }

  submit() {
    if (this.repoURL) {
      this.stackBlitzService.loadGithubWorkspace(this.repoURL);
    }
  }

}
