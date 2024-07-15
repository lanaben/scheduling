import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private apiUrl = `${environment.apiUrl}/api/v1/Absences`;

  constructor(private http: HttpClient) { }

  getAbsencesByDate(selectedDate: string): Observable<any[]> {
    const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
    const headers = this.getHeaders();

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((absences: any[]) => absences.filter(absence => {
        const absenceDate = new Date(absence.Timestamp).toISOString().split('T')[0];
        return absenceDate === formattedDate;
      })),
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
      console.error('Access token not found in local storage');
      return new HttpHeaders();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
