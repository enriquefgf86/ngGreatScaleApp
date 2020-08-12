import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/services.index';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public imgUrl: any;
  public user: User;

  constructor(
    public sideBarService: SidebarService,
    private userService: UserService
  ) {
    this.imgUrl = userService.userRenew.getImgUrl;
    this.user = userService.userRenew;
  }

  ngOnInit(): void {}

  logOut() {
    return this.userService.logOut();
  }
}
