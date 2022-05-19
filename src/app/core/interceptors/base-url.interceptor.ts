import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { ConfigService } from '@core/services/config.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.configService.getConfig().pipe(
      take(1),
      switchMap(({ apiUrl }) => {
        const baseUrlRequest = request.clone({
          url: `${apiUrl}${request.url}`,
        });
        return next.handle(baseUrlRequest);
      })
    );
  }

  constructor(private configService: ConfigService) {}
}
