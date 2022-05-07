import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, Observable } from 'rxjs';
import { setErrorMessage } from '@store/actions/error.actions';
import { signOut } from '@store/actions/user.actions';

@Injectable()
export class HandleErrorsInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.store.dispatch(signOut());
          return EMPTY;
        }

        const { error } = err;
        const errorMessage: string = error?.message ?? 'Something went wrong';
        this.store.dispatch(setErrorMessage({ message: errorMessage }));
        return EMPTY;
      })
    );
  }

  constructor(private store: Store) {}
}
