import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { IncrementerComponent } from '../components/incrementer/incrementer.component';
import { GraphicsDognutsComponent } from '../components/graphics-dognuts/graphics-dognuts.component';
import { SaccountSettingsComponent } from './saccount-settings/saccount-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RXJSComponentComponent } from './rxjscomponent/rxjscomponent.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
    IncrementerComponent,
    GraphicsDognutsComponent,
    SaccountSettingsComponent,
    PromisesComponent,
    RXJSComponentComponent,
    UserProfileComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule
  ],
})
export class PageModule {}
