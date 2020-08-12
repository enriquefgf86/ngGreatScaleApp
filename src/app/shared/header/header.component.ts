import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public imgUrl: any;
  public user: User;

  constructor(private userService: UserService) {
    this.user = userService.userRenew;
  }

  ngOnInit(): void {}

  logOut() {
    return this.userService.logOut();
  }
}
