import { User, userFactory } from "./user";
import { File, fileFactory } from "./file";

export class Workspace {
  constructor(
    public id: number,
    public name: string,
    public owner: User,
    public space: File[],
  ){}
}

export function workspaceFactory(snapshot): Workspace {
  var files: File[] = [];
  var file_id = 0;
  var user_id = 1; // TODO
  var workspace_id = 1; // TODO
  var workspace_name = 'Example Project'; // TODO
  var owner = userFactory(user_id, 'John Doe') // TODO

  for(var file in snapshot) {
    files.push(fileFactory(file_id+=1, file, owner, snapshot[file]));
  }
  
  return new Workspace(workspace_id, workspace_name, owner, files);
}