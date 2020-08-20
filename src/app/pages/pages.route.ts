import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
///////////////////////Componentes//////////////////////////////////////////////////////////
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { SaccountSettingsComponent } from './saccount-settings/saccount-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RXJSComponentComponent } from './rxjscomponent/rxjscomponent.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

////////////////////////Mantenimiento//////////////////////////
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard], //de no estar logeado ninguna de estos path podar ser accesible segun la calse de Auth Guar d
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'DashBoard' },
      },
      {
        path: 'accountsettings',
        component: SaccountSettingsComponent,
        data: { title: 'Settings' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Process progress' },
      },
      {
        path: 'graphic1',
        component: Graphics1Component,
        data: { title: 'Graphics' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promises' },
      },
      {
        path: 'rxjs',
        component: RXJSComponentComponent,
        data: { title: 'RXJS' },
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: { title: 'User Profile' },
      },

      /////////////////////////////////////rutas de mantenimiento//////////////////////////////////////
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Users Maintenance' },
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        data: { title: 'Doctors Maintenance' },
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent,
        data: { title: 'Doctor Edit' },
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        data: { title: 'Hospitals Maintenance' },
      },
      /////////////////////////////////redirection//////////////////////////////////////
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
