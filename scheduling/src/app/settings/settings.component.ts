import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  accessToken: string | undefined;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe(
      (response: any) => {
        this.accessToken = response.access_token;
        console.log('Access Token:', this.accessToken);
        // You can store this token or use it as needed
      },
      (error) => {
        console.error('Error fetching token:', error);
      }
    );
  }
}
