import { SidebarService } from 'src/app/services/services.index';
import { Component, OnInit } from '@angular/core';

// declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  // styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(
    private sidebarService:SidebarService
  ) {}

  ngOnInit(): void {
    // init_plugins();
    this.sidebarService.loadMenu()
  }
}
