export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface SignUpRequest {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  name: string;
  login: string;
}

export interface UpdateUserRequest {
  name: string;
  login: string;
  password: string;
}

export interface UpdateUserResponse {
  id: string;
  name: string;
  login: string;
}
