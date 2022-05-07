import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import {
  deleteUserPending,
  deleteUserSuccess,
  getUserInfoSuccess,
  initUser,
  signInPending,
  signInSuccess,
  signOut,
  signUpPending,
  signUpSuccess,
  updateUserPending,
  updateUserSuccess,
} from '@store/actions/user.actions';
import { selectUser, selectUserId, selectUserLogin } from '@store/selectors/user.selectors';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export default class UserEffects {
  private initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.userService.getInitUser().pipe(map((user) => initUser({ user }))))
    );
  });

  private signInPending$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signInPending),
      mergeMap(({ req }) => this.authService.signIn(req).pipe(map((rsp) => signInSuccess({ rsp }))))
    );
  });

  private signInSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signInSuccess),
      concatLatestFrom(() => this.store.select(selectUserLogin)),
      mergeMap(([_, login]) =>
        this.userService
          .getUserInfo(login)
          .pipe(map((userInfo) => getUserInfoSuccess({ userInfo })))
      )
    );
  });

  private getUserInfoSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(getUserInfoSuccess),
        concatLatestFrom(() => this.store.select(selectUser)),
        tap(([_, user]) => {
          this.userService.setLocalStorageUser(user);
          this.router.navigateByUrl('/boards');
        })
      );
    },
    { dispatch: false }
  );

  private signUpPending$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpPending),
      mergeMap(({ req }) => this.authService.signUp(req).pipe(map((rsp) => signUpSuccess({ rsp }))))
    );
  });

  private signUpSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signUpSuccess),
        tap(() => this.router.navigateByUrl('/auth/sign-in'))
      );
    },
    { dispatch: false }
  );

  private signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signOut),
        tap(() => this.userService.unsetLocalStorageUser())
      );
    },
    { dispatch: false }
  );

  private updateUserPending$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserPending),
      concatLatestFrom(() => this.store.select(selectUserId)),
      mergeMap(([{ req }, id]) =>
        this.userService.updateUser(id, req).pipe(map((rsp) => updateUserSuccess({ rsp })))
      )
    );
  });

  private deleteUserPending$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUserPending),
      concatLatestFrom(() => this.store.select(selectUserId)),
      mergeMap(([_, id]) => this.userService.deleteUser(id).pipe(map(() => deleteUserSuccess())))
    );
  });

  private deleteUserSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteUserSuccess),
        tap(() => {
          this.userService.unsetLocalStorageUser();
          this.router.navigateByUrl('/auth/sign-in');
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}
}
