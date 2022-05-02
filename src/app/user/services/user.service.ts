import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';
import { ConfigService } from '@core/services/config.service';
import { UpdateUserRequest, UpdateUserResponse } from '@shared/models/api.model';
import { defaultUser, User, UserInfo } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public getInitUser(): Observable<User> {
    return this.configService.getConfig().pipe(
      take(1),
      map(({ localStorageUserKey }) => this.getLocalStorageUser(localStorageUserKey))
    );
  }

  public setLocalStorageUser(user: User): void {
    this.configService
      .getConfig()
      .pipe(
        take(1),
        tap(({ localStorageUserKey }) =>
          localStorage.setItem(localStorageUserKey, JSON.stringify(user))
        )
      )
      .subscribe();
  }

  public unsetLocalStorageUser(): void {
    this.configService
      .getConfig()
      .pipe(
        take(1),
        tap(({ localStorageUserKey }) => localStorage.removeItem(localStorageUserKey))
      )
      .subscribe();
  }

  public getUserInfo(login: string): Observable<UserInfo> {
    return this.http.get<UserInfo[]>('/users').pipe(
      map(
        (usersInfo) =>
          usersInfo.find((userInfo) => userInfo.login === login) ?? {
            id: '',
            name: '',
            login: '',
          }
      )
    );
  }

  public updateUser(id: string, req: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.put<UpdateUserResponse>(`/users/${id}`, req);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`/users/${id}`);
  }

  private getLocalStorageUser(key: string): User {
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultUser)) as User;
  }

  constructor(private configService: ConfigService, private http: HttpClient) {}
}
