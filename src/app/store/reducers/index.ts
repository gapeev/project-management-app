import { ActionReducerMap } from '@ngrx/store';
import { State } from '@store/state.model';
import { errorReducer } from './error.reducer';
import { userReducer } from './user.reducer';

const reducers: ActionReducerMap<State> = {
  user: userReducer,
  error: errorReducer,
};

export default reducers;
