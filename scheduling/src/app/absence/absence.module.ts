import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AbsenceComponent } from './absence.component';

@NgModule({
  declarations: [
    AbsenceComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule 
  ],
  exports: [
    AbsenceComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AbsenceModule { }