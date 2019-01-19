export class User {
  constructor(
    public id: number,
    public name: string
  ){}
}

export function userFactory(id: number, name: string) {
  return new User(id, name);
}