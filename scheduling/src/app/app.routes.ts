import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { AbsenceComponent } from './absence/absence.component';

export const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'users', component: UserComponent },
  { path: 'absences', component: AbsenceComponent },
  { path: '', redirectTo: '/settings', pathMatch: 'full' },
];