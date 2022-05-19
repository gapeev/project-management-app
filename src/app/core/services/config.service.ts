import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Config } from '@shared/models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public getConfig(): Observable<Config> {
    if (this.config) {
      return of(this.config);
    }
    return this.http.get<Config>(this.configPath).pipe(tap((config) => (this.config = config)));
  }

  private http!: HttpClient;

  private config: Config | null = null;

  private configPath: string = 'assets/config.json';

  constructor(private handle: HttpBackend) {
    this.http = new HttpClient(handle);
  }
}
