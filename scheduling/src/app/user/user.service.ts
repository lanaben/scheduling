import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api4.allhours.com/api/v1/Users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    const headers = this.getHeaders();

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: any): Observable<any> {
    console.log("test");
    const headers = this.getHeaders();

    return this.http.post<any>(this.apiUrl, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      return new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      });
    } else {
      // Handle case where access token is not available
      console.error('Access token not found in local storage');
      // You might want to redirect to login or handle this error scenario
      return new HttpHeaders();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }
}
