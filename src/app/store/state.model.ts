import { User } from '@shared/models/user.model';

export interface State {
  user: User;
  error: string;
}
