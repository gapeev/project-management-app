import { createAction, props } from '@ngrx/store';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@shared/models/api.model';
import { User, UserInfo } from '@shared/models/user.model';

export const initUser = createAction('[App] Init User', props<{ user: User }>());

export const signInPending = createAction(
  '[Sign In Page] Sign In Pending',
  props<{ req: SignInRequest }>()
);

export const signInSuccess = createAction(
  '[Sign In Effect] Sign In Success',
  props<{ rsp: SignInResponse }>()
);

export const signInFailure = createAction('[Sign In Page] Sign In Failure');

export const getUserInfoSuccess = createAction(
  '[Sign In Effect] Get User Info',
  props<{ userInfo: UserInfo }>()
);

export const signUpPending = createAction(
  '[Sign Up Page] Sign Up Pending',
  props<{ req: SignUpRequest }>()
);

export const signUpSuccess = createAction(
  '[Sign Up Effect] Sign Up Success',
  props<{ rsp: SignUpResponse }>()
);

export const signUpFailure = createAction('[Sign Up Page] Sign Up Failure');

export const signOut = createAction('[Header] Sign Out');

export const updateUserPending = createAction(
  '[Update User Page] Update User Pending',
  props<{ req: UpdateUserRequest }>()
);

export const updateUserSuccess = createAction(
  '[Update User Page] Update User Success',
  props<{ rsp: UpdateUserResponse }>()
);

export const updateUserFailure = createAction('[Update User Page] Update User Failure');

export const deleteUserPending = createAction('[Header] Delete User Pending');

export const deleteUserSuccess = createAction('[Header] Delete User Success');
