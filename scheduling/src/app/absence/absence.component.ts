import { Component, OnInit } from '@angular/core';
import { AbsenceService } from './absence.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AbsenceComponent implements OnInit {
  absences: any[] = [];
  selectedDate: string = '';
  isLoading: boolean = false;

  constructor(private absenceService: AbsenceService) { }

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    if (this.selectedDate) {
      this.isLoading = true;
      this.absenceService.getAbsencesByDate(this.selectedDate).subscribe(
        absences => {
          this.absences = absences;
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
}
