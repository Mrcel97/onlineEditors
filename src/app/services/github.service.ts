import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { httpOptions } from '../../assets/headers/githubHeader';
import { File, fileFactory } from '../../assets/model/file';
import { userFactory } from '../../../dist/onlineEditors/assets/model/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient) { }

  obtainGithubFile(fileURL: string): Subject<File> {
    var file: Subject<File> = new Subject();
    var file_id: number = 0; // TODO
    var user_id: number = 1; // TODO

    this.http.get<File>(fileURL, httpOptions).subscribe(
      response => {
        file.next(
          fileFactory(
            file_id+=1,
            response.name,
            userFactory(user_id, response.html_url.split("/")[3]),
            response.content
          )
        );
      }
    );
    return file;
  }
}
