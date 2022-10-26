import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // 'x-rapidapi-key': '96dae34277msh2b026ecfe0f0fe1p1a934djsn477378bcd4a1',
        // 'x-rapidapi-host': ' https://rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '9c07e86b8b934ba699652f9e1ca85cc4',
      },
    });
    return next.handle(req);
  }
}
