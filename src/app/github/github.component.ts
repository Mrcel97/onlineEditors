import { GithubService } from './../services/github.service';
import { Component, OnInit, Input } from '@angular/core';

import { StackBlitzService } from '../services/stack-blitz.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
  @Input() user: boolean;
  repositoryInput: boolean = false;
  fileInput: boolean = false;
  repoURL: string;
  fileURL: string;
  
  constructor(
    public stackBlitzService: StackBlitzService, 
    public githubService: GithubService
  ) { }

  ngOnInit() { }

  showRepositoryInput() {
    this.repositoryInput = (this.repositoryInput) ? false : true;
  }

  showFileInput() {
    this.fileInput = (this.fileInput) ? false : true;
  }

  loadWebRepo() {
    if (this.repoURL) {
      this.stackBlitzService.loadGithubWorkspace(this.repoURL);
    }
  }

  loadFile() {
    var githubUserName: string = 'MrceL97';

    if (this.fileURL) {
      this.githubService.obtainGithubFile(this.fileURL).subscribe(
        file => {
          this.stackBlitzService.createFile(file.name, file.language, file.content);
        }
      );
    }
  }
}
