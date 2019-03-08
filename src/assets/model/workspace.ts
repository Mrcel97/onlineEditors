import { FirebaseUser, firebaseUserFactory, userFactory } from "./user";
import { File, fileFactory } from "./file";

export class Workspace {
  
  constructor(
    public name: string,
    public owner: FirebaseUser,
    public writer: FirebaseUser,
    public collaborators: string[],
    public files: File[],
    public writerRequests: Map<string, Number>,
    public id?: string,
  ){}
}

export function workspaceSnapshotFactory(snapshot): Workspace {
  var files: File[] = [];
  var file_id = 0;
  var user_id = '1'; // TODO
  var workspace_name = 'Example Project'; // TODO
  var owner = firebaseUserFactory(user_id, 'johndoe@gmail.com', 'John Doe', 'www.example.com', 1234567654) // TODO

  for(var file in snapshot) {
    files.push(fileFactory(file_id+=1, file, userFactory(user_id, owner.displayName), snapshot[file]));
  }
  
  return new Workspace(workspace_name, owner, owner, [owner.email], files, this.defaultWriterRequest(owner.uid, 0));
}

export function defaultWriterRequest(userID: string, requestTime: Number) {
  var writerRequests = new Map();
  var convMap: Map<string, Number> = new Map();

  writerRequests.set(userID, requestTime);
  writerRequests.forEach( (val: Number, key: string) => convMap[key] = val);

  return convMap;
}