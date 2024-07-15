import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../user/authentication.service';

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
      },
      (error) => {
        console.error('Error fetching token:', error);
      }
    );
  }
}
