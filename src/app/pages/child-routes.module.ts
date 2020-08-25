// import { RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// ///moviendo las rutas al lazy load
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Graphics1Component } from './graphics1/graphics1.component';
// import { SaccountSettingsComponent } from './saccount-settings/saccount-settings.component';
// import { PromisesComponent } from './promises/promises.component';
// import { RXJSComponentComponent } from './rxjscomponent/rxjscomponent.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';

// ////////////////////////Mantenimiento//////////////////////////
// import { UsersComponent } from './maintenance/users/users.component';
// import { DoctorsComponent } from './maintenance/doctors/doctors.component';
// import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
// import { DoctorComponent } from './maintenance/doctors/doctor.component';
// import { SearchResultsComponent } from './search-results/search-results.component';
// import { RoleGuardGuard } from '../guards/role-guard.guard';


// const childRoutes=[//nuevo arreglo de rutas para el lazy load
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     data: { title: 'DashBoard' },
//   },
//   {
//     path: 'accountsettings',
//     component: SaccountSettingsComponent,
//     data: { title: 'Settings' },
//   },
//   {
//     path: 'progress',
//     component: ProgressComponent,
//     data: { title: 'Process progress' },
//   },
//   {
//     path: 'graphic1',
//     component: Graphics1Component,
//     data: { title: 'Graphics' },
//   },
//   {
//     path: 'promises',
//     component: PromisesComponent,
//     data: { title: 'Promises' },
//   },
//   {
//     path: 'rxjs',
//     component: RXJSComponentComponent,
//     data: { title: 'RXJS' },
//   },
//   {
//     path: 'user-profile',
//     component: UserProfileComponent,
//     data: { title: 'User Profile' },
//   },

//   /////////////////////////////////////rutas de mantenimiento//////////////////////////////////////

// /////ruta solo vista por administrador//
//   {
//     path: 'users',canActivate:[RoleGuardGuard],//pasandolo por el guardia de roles para s
//     component: UsersComponent,
//     data: { title: 'Users Maintenance' },
//   },
//   {
//     path: 'doctors',
//     component: DoctorsComponent,
//     data: { title: 'Doctors Maintenance' },
//   },
//   {
//     path: 'doctor/:id',
//     component: DoctorComponent,
//     data: { title: 'Doctor Edit' },
//   },
//   {
//     path: 'hospitals',
//     component: HospitalsComponent,
//     data: { title: 'Hospitals Maintenance' },
//   },
//   {
//     path: 'search_result/:textTerm',
//     component: SearchResultsComponent,
//     data: { title: 'Search Result' },
//   },
//   /////////////////////////////////redirection//////////////////////////////////////
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
// ]

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,

//     RouterModule.forChild(childRoutes)
//   ],
//   exports:[RouterModule]
// })
// export class ChildRoutesModule { }
