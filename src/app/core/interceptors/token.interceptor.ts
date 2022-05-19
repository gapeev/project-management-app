import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { selectUserToken } from '@store/selectors/user.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(selectUserToken).pipe(
      take(1),
      switchMap((token) => {
        const tokenRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(tokenRequest);
      })
    );
  }

  constructor(private store: Store) {}
}
