import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Adjust {
  themeUrl: string;
  theme: string;
}
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  adjust: Adjust = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default',
  };
  constructor(@Inject(DOCUMENT) private _document) {
    this.chargeSavedSettingAdjust();
  }

  saveSettingAdjust() {
    console.log('saved on localSotrage');

    localStorage.setItem('adjust', JSON.stringify(this.adjust));
  }

  chargeSavedSettingAdjust() {
    if (localStorage.getItem('adjust')) {
      this.adjust = JSON.parse(localStorage.getItem('adjust'));
      console.log('charging data adjust setting stored');
      this.applyColorTheme(this.adjust.theme)
    } else {
      console.log('using default settin adjust');
    }
  }

  applyColorTheme(theme:string){
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    this.adjust.theme=theme;
    this.adjust.themeUrl=url;
    this.saveSettingAdjust();
  }
}
