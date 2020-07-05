import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Dashboard',
          url: '/dashboard',
        },
        {
          title: 'Progress Bars',
          url: '/progress',
        },
        {
          title: 'Graphics',
          url: '/graphic1',
        },
      ],
    },
  ];

  constructor() {}
}
