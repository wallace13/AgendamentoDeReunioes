class UserSenha{
  constructor(
      public current_password: string,
      public password: string,
      public password_confirmation: string,
      public id?: number
  ){}

}
export {UserSenha}
