import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/services.index';

@Component({
  selector: 'app-saccount-settings',
  templateUrl: './saccount-settings.component.html',
  styleUrls: ['./saccount-settings.component.scss'],
})
export class SaccountSettingsComponent implements OnInit {
  constructor(public settingService: SettingsService) {}

  ngOnInit(): void {
    this.setCheckBox();
  }

  changeColorTheme(color: string, link: any) {
    // console.log(color);
    // console.log(link);
    this.applyCheckBox(link);
    this.settingService.applyColorTheme(color);
  }

  applyCheckBox(link: any) {
    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
      link.classList.add('working');
    }
  }

  setCheckBox() {
    let selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      let theme = this.settingService.adjust.theme;
      if (ref.getAttribute('data-theme') === theme)
        ref.classList.add('working');
      break;
    }
  }
}
