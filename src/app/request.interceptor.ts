import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenService } from './views/login/service/accessToken.service';

export class RequestInterceptor implements HttpInterceptor {
  constructor(private accessTokenService: AccessTokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!!this.accessTokenService.token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer' + this.accessTokenService.token,
        },
      });
    }

    return next.handle(req);
  }
}
