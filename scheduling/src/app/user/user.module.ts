import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component'; // Ensure the path is correct
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule 
  ],
  exports: [
    UserComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }