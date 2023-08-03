class User{
    constructor(
        public name: string,
        public userName: string,
        public email: string,
        public ramal: string,
        public nivelPermissao: number,
        public password: string,
        public password_confirmation: string,
        public id?: number
    ){}

    static fromCredentials(userName: string, password: string): User {
        return new User('', userName, '','', 0 ,password,'');
    }
  }
  export {User}
