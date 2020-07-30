export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public id?: string,
    public role?: string,
    public google?: boolean,
    public img?: string
  ) {}
}