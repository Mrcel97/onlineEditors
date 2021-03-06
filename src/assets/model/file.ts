import { User } from './user';

export class File {
  public html_url: string; // Github imported files

  constructor(
    public id: number,
    public name: string,
    public owner: User,
    public language: string,
    public content: string
  ) {}
}

export function fileFactory(id:number, name: string, owner: User, content: string) {
  var nameComponents = name.split(".");
  var fileName = nameComponents.slice(0, nameComponents.length - 1).join(".");
  var fileLanguage: string;

  if (nameComponents.length > 1) {
    fileLanguage = nameComponents[nameComponents.length - 1];
  } else {
    fileLanguage = 'text';
  }
  return new File(id, fileName, owner, fileLanguage, content);
};