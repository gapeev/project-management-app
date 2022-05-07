import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '@shared/models/user.model';

export const selectUser = createFeatureSelector<User>('user');
export const selectIsUserPending = createSelector(selectUser, ({ isPending }) => isPending);
export const selectUserToken = createSelector(selectUser, ({ token }) => token);
export const selectUserLogin = createSelector(selectUser, ({ login }) => login);
export const selectIsUserAuth = createSelector(selectUser, ({ isAuth }) => isAuth);
export const selectUserId = createSelector(selectUser, ({ id }) => id);
