import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/services.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public sideBarService:SidebarService) { }

  ngOnInit(): void {
  }

}
