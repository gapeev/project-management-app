import { ActionReducerMap } from '@ngrx/store';
import { State } from '@store/state.model';
import { boardReducer } from './boards.reducer';
import { errorReducer } from './error.reducer';
import { userReducer } from './user.reducer';

const reducers: ActionReducerMap<State> = {
  user: userReducer,
  error: errorReducer,
  board: boardReducer,
};

export default reducers;
