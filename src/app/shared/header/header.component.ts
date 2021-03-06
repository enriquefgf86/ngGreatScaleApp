import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public imgUrl: any;
  public user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = userService.userRenew;
  }

  ngOnInit(): void {}

  logOut() {
    return this.userService.logOut();
  }

  search(searchTerms: String) {
    const urlSearch = '/search_result';

    if (searchTerms.length === 0) {
      return;
    }

    console.log(searchTerms);
    this.router.navigate([`${urlSearch}/${searchTerms}`]);
  }
}
