import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@shared/models/api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signIn(req: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/signin', req);
  }

  public signUp(req: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>('/signup', req);
  }

  constructor(private http: HttpClient) {}
}
