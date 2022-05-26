import { Injectable } from "@angular/core";
import { User } from '../model/user.model';
import { AES, enc } from 'crypto-js';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {


  get token(): string {
    return window.localStorage.getItem(environment.AUTH_TOKEN_KEY) ?? '';
  }

  set token(value: string){
    window.localStorage.setItem(environment.AUTH_TOKEN_KEY, value);
  }

  set user(usuario: User){
    if(!this.token) {
      throw new Error('Precisa de um access_token para gravar o usuário');
    }

    const token = this.token;
    const cipher = AES.encrypt(JSON.stringify(usuario), token).toString();
    window.localStorage.setItem(environment.AUTH_USER_KEY, cipher);
  }

  get authUser(): string  {
    return window.localStorage.getItem(environment.AUTH_USER_KEY) ?? '';
  }

  get user(): User {
    if(!this.token){
      throw new Error('Precisa de um access_toke para gravar o usuário');
    }

    const token = this.token;
    const cipher = window.localStorage.getItem(environment.AUTH_USER_KEY) ?? '';

    const bytes = AES.decrypt(cipher, token);
    const user = JSON.parse(bytes.toString(enc.Utf8));

    return user;
  }

  set expires(seconds: number){
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + seconds);
    window.localStorage.setItem('expiration', expires.getTime().toString());
  }

  get expires(): number {
    const timestamp = window.localStorage.getItem('expiration') ?? 0;
    return +timestamp;
  }

  clear(): void {
    window.localStorage.removeItem(environment.AUTH_TOKEN_KEY);
    window.localStorage.removeItem(environment.AUTH_USER_KEY);
    // window.localStorage.removeItem('arvore_token');
  }


}
