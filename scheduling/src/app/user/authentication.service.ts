import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenUrl = '/api/connect/token';
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;
  private scope = 'api';

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('scope', 'api');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.tokenUrl, body.toString(), { headers }).pipe(
      tap((response: any) => {
        if (response && response.access_token) {
          this.saveAuthData(response.access_token);
        }
      }),
      catchError(this.handleError)
    );
  }

  private saveAuthData(accessToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('client_id', this.clientId);
    localStorage.setItem('client_secret', this.clientSecret);
    localStorage.setItem('scope', this.scope);
  }

  getAuthData(): { [key: string]: string | null } {
    return {
      access_token: localStorage.getItem('access_token'),
      client_id: localStorage.getItem('client_id'),
      client_secret: localStorage.getItem('client_secret'),
      scope: localStorage.getItem('scope')
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }
}