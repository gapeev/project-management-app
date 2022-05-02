export interface User {
  id: string;
  name: string;
  login: string;
  token: string;
  isAuth: boolean;
  isPending: boolean;
}

export const defaultUser: User = {
  id: '',
  name: '',
  login: '',
  token: '',
  isAuth: false,
  isPending: false,
};

export interface UserInfo {
  id: string;
  name: string;
  login: string;
}
