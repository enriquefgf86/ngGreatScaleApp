import { Component, Injectable } from '@angular/core';
import { SettingsService,SidebarService,SharedService  } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'ngGreatScaleProject';

  constructor(public settingServices: SettingsService) {}
}
