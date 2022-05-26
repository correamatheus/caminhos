import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessTokenService } from './accessToken.service';
import { tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService{
  userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private accessTokenService: AccessTokenService){
    if(this.isLogged()){
      this.userSubject.next(this.accessTokenService.user);
    }
  }

  signIn(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', username);
    urlSearchParams.set('password', password);

    const body = urlSearchParams.toString();

    return this.http.post(environment.TOKEN_PATH, body, {headers}).pipe( tap((data: any) => {
      const user = {id: data.id, profileId: data.profile_id, username: data.username, email: data.email, role: data.role};
      this.accessTokenService.token = data.access_token;
      this.accessTokenService.expires = data.expires_in;
      this.accessTokenService.user = user;
      this.userSubject.next(user);
    }))
  }

  signOut(): void {
    this.accessTokenService.clear();
    this.userSubject.next(null);
    window.location.href = '/#';
  }

  getLoggedUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  isLogged(): boolean {
    return !!this.accessTokenService.token;
  }

  loginExpired(): boolean {
    return ( new Date() > new Date(this.accessTokenService.expires) );
  }



}
