import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu = [];
  // menu: any = [
  //   {
  //     title: 'Main',
  //     icon: 'mdi mdi-gauge',
  //     subMenu: [
  //       {
  //         title: 'Dashboard',
  //         url: '/dashboard',
  //       },
  //       {
  //         title: 'Progress Bars',
  //         url: '/progress',
  //       },
  //       {
  //         title: 'Graphics',
  //         url: '/graphic1',
  //       },
  //       {
  //         title: 'Promises',
  //         url: '/promises',
  //       },
  //       {
  //         title: 'RXJS',
  //         url: '/rxjs',
  //       },
  //     ],
  //   },

  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     subMenu: [
  //       {
  //         title: 'Users',
  //         url: '/users',
  //       },
  //       {
  //         title: 'Hospitals',
  //         url: '/hospitals',
  //       },
  //       {
  //         title: 'Doctors',
  //         url: '/doctors',
  //       },

  //     ],
  //   },
  // ];

  loadMenu() {
   
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
