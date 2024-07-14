import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'; // Import necessary modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    UserComponent,
    UserModule
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    UserModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
  ],
  schemas: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
