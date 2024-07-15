import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { AbsenceComponent } from './absence/absence.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'users', component: UserComponent },
  { path: 'absences', component: AbsenceComponent },
  { path: '', redirectTo: '/settings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
