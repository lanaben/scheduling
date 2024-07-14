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
  selectedUserId: number | undefined;
  selectedUser: any;
  newUser = {
    firstName: '',
    lastName: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.onSubmit();
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
}
