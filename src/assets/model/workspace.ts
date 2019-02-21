import { FirebaseUser, firebaseUserFactory, userFactory } from "./user";
import { File, fileFactory } from "./file";

export class Workspace {
  constructor(
    public id: string,
    public name: string,
    public owner: FirebaseUser,
    public writer: FirebaseUser,
    public collaborators: FirebaseUser[],
    public files: File[],
  ){}
}

export function workspaceSnapshotFactory(snapshot): Workspace {
  var files: File[] = [];
  var file_id = 0;
  var user_id = '1'; // TODO
  var workspace_id = '1'; // TODO
  var workspace_name = 'Example Project'; // TODO
  var owner = firebaseUserFactory(user_id, 'johndoe@gmail.com', 'John Doe', 'www.example.com', 1234567654) // TODO

  for(var file in snapshot) {
    files.push(fileFactory(file_id+=1, file, userFactory(user_id, owner.displayName), snapshot[file]));
  }
  
  return new Workspace(workspace_id, workspace_name, owner, owner, [owner], files);
}