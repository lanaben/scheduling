import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
// import { AbsencesComponent } from './absences/absences.component';

export const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'users', component: UserComponent },
  // { path: 'absences', component: AbsencesComponent },
  { path: '', redirectTo: '/settings', pathMatch: 'full' }, // Default route
];