import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Absence {
  UserId: string;
  Timestamp: string;
  AbsenceDefinitionId: string;
  Comment: string;
  PartialTimeFrom: string;
  PartialTimeTo: string;
  PartialTimeDuration: number;
  IsPartial: boolean;
  OverrideHolidayAbsence: boolean;
}

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AbsenceComponent implements OnInit {
  absences: Absence[] = [];
  selectedDate: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    if (this.selectedDate) {
      this.isLoading = true;
      const formattedDate = new Date(this.selectedDate).toISOString().split('T')[0];
      const url = `https://api4.allhours.com/api/v1/Absences`;
      const headers = this.getHeaders();

      this.http.get<Absence[]>(url, { headers })
        .subscribe(
          absences => {
            this.absences = absences.filter(absence => {
              const absenceDate = new Date(absence.Timestamp).toISOString().split('T')[0];
              return absenceDate === formattedDate;
            });
            this.isLoading = false;
          },
          error => {
            console.error('Error loading absences:', error);
            this.isLoading = false;
          }
        );
    }
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.selectedDate = selectedDate;
    this.loadAbsences();
  }

  refreshAbsences(): void {
    this.loadAbsences();
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
}
