import { User } from './user';

export class File {
  constructor(
    public id: number,
    public name: string,
    public owner: User,
    public language: string,
    public content: string
  ) {}
}

export function fileFactory(id:number, name: string, owner: User, languge: string, content: string) {
  return new File(id, name, owner, languge, content);
}