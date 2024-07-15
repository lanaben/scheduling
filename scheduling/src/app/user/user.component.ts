import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;

  newUser = {
    firstName: '',
    lastName: ''
  };

  selectedUserId: string | null = null;

  newAbsence = {
    AbsenceDefinitionId: '',
    Timestamp: '',
    Comment: '',
    PartialTimeFrom: '',
    PartialTimeTo: '',
    PartialTimeDuration: 0,
    IsPartial: false,
    OverrideHolidayAbsence: false
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => console.error('Error fetching users:', error)
    );
  }

  onSubmit(): void {
    console.log("test");
    this.userService.addUser(this.newUser).subscribe(
      response => {
        console.log('User added successfully:', response);
        this.newUser = { firstName: '', lastName: '' };
        this.loadUsers();
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }

  showAbsenceForm(userId: string): void {
    console.log(`User ID: ${userId}`);
    this.selectedUserId = userId;
  }

  submitAbsence(): void {
    if (this.selectedUserId) {
      const absence = {
        UserId: this.selectedUserId,
        ...this.newAbsence,
        Timestamp: new Date(this.newAbsence.Timestamp).toISOString(),
        PartialTimeFrom: new Date(this.newAbsence.PartialTimeFrom).toISOString(),
        PartialTimeTo: new Date(this.newAbsence.PartialTimeTo).toISOString()
      };

      this.userService.addAbsence(absence).subscribe(
        response => {
          console.log('Absence added successfully:', response);
          this.selectedUserId = null;
        },
        error => {
          console.error('Error adding absence:', error);
        }
      );
    }
  }
}
