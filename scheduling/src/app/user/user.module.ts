import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component'; // Ensure the path is correct
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  exports: [
    UserComponent // Exporting if you need to use it in other modules
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }