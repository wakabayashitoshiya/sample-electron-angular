export class LoginModel {
  constructor(
    public loginId: string,
    public password: string,
    public message?: string
  ) { }
}
