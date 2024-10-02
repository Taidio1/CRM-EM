export class User {
    username: string;
    password: string;
    email: string;
    rola:string;
    token: string;
  
    constructor(username: string, password: string, email: string, rola: string) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.rola = rola;
    }
  }