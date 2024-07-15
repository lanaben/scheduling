import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  filteredUsers: any[] = [];
  selectedUser: any;

  newUser = {
    firstName: '',
    lastName: '',
    email: ''
  };

  searchFirstName: string = '';
  searchLastName: string = '';

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

  constructor(private userService: UserService, private renderer: Renderer2,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.filteredUsers = users;
      },
      error => console.error('Error fetching users:', error)
    );
  }

  onSubmit(): void {
    this.userService.addUser(this.newUser).subscribe(
      response => {
        console.log('User added successfully:', response);
        this.newUser = { firstName: '', lastName: '', email: '' };
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
    const absenseFormContainer = this.el.nativeElement.querySelector('.absence-form-container');
    if (absenseFormContainer) {
      absenseFormContainer.scrollIntoView({ behavior: 'smooth' });
    }
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

  searchUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.FirstName.toLowerCase().includes(this.searchFirstName.toLowerCase()) &&
      user.LastName.toLowerCase().includes(this.searchLastName.toLowerCase())
    );
  }
}
