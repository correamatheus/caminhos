import { Observable } from 'rxjs';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AutenticacaoService } from '../service/autenticacao.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean > {
    if(!this.autenticacaoService.isLogged() || this.autenticacaoService.loginExpired()){
      this.autenticacaoService.signOut();
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
