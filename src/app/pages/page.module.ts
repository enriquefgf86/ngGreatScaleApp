import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.route';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    PagesComponent,
  ],
  imports: [CommonModule, SharedModule, PAGES_ROUTES],
})
export class PageModule {}
