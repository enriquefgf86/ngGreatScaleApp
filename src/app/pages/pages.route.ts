import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { SaccountSettingsComponent } from './saccount-settings/saccount-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RXJSComponentComponent } from './rxjscomponent/rxjscomponent.component';
import { AuthGuard } from '../guards/auth.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],//de no estar logeado ninguna de estos path podar ser accesible segun la calse de Auth Guar d
    children: [
      { path: 'dashboard', component: DashboardComponent,data:{title:"DashBoard"} },
      { path: 'accountsettings', component: SaccountSettingsComponent,data:{title:"Settings"} },
      { path: 'progress', component: ProgressComponent,data:{title:"Process progress"} },
      { path: 'graphic1', component: Graphics1Component,data:{title:"Graphics"} },
      { path: 'promises', component: PromisesComponent ,data:{title:"Promises"}},
      { path: 'rxjs', component: RXJSComponentComponent,data:{title:"RXJS"} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
