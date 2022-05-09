import { Board, Search } from '@shared/models/board.model';
import { User } from '@shared/models/user.model';

export interface BoardState {
  boards: ReadonlyArray<Board>;
  board: Board;
  search: Search;
  isPending: boolean;
}

export interface State {
  user: User;
  error: string;
  board: BoardState;
}
