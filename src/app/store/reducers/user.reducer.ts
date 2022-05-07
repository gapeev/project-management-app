import { createReducer, on } from '@ngrx/store';
import { defaultUser, User } from '@shared/models/user.model';
import {
  deleteUserPending,
  deleteUserSuccess,
  getUserInfoSuccess,
  initUser,
  signInFailure,
  signInPending,
  signInSuccess,
  signOut,
  signUpFailure,
  signUpPending,
  signUpSuccess,
  updateUserFailure,
  updateUserPending,
  updateUserSuccess,
} from '@store/actions/user.actions';

export const initialState: User = defaultUser;

export const userReducer = createReducer(
  initialState,
  on(initUser, (state, { user }): User => ({ ...state, ...user })),
  on(signInPending, (state, { req }): User => ({ ...state, login: req.login, isPending: true })),
  on(signInSuccess, (state, { rsp }): User => {
    return { ...state, ...rsp, isAuth: true, isPending: false };
  }),
  on(signInFailure, (state): User => ({ ...state, isPending: false })),
  on(getUserInfoSuccess, (state, { userInfo }): User => ({ ...state, ...userInfo })),
  on(signUpPending, (state): User => ({ ...state, isPending: true })),
  on(signUpSuccess, (state): User => ({ ...state, isPending: false })),
  on(signUpFailure, (state): User => ({ ...state, isPending: false })),
  on(signOut, (): User => defaultUser),
  on(updateUserPending, (state): User => ({ ...state, isPending: true })),
  on(updateUserSuccess, (state, { rsp }): User => ({ ...state, ...rsp, isPending: false })),
  on(updateUserFailure, (state): User => ({ ...state, isPending: false })),
  on(deleteUserPending, (state): User => ({ ...state, isPending: true })),
  on(deleteUserSuccess, (): User => defaultUser)
);
