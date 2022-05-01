import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectIsUserAuth } from '@store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class SignGuard implements CanActivate {
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store
      .select(selectIsUserAuth)
      .pipe(map((isAuth) => !isAuth || this.router.parseUrl('/')));
  }

  constructor(private router: Router, private store: Store) {}
}
