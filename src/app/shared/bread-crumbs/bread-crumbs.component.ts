import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
})
export class BreadCrumbsComponent implements OnInit {
  title: string;
  constructor(
    private router: Router,
    private pageTitle: Title,
    private metaTags: Meta
  ) {
    this.gettingData().subscribe((event) => {
      console.log(event);
      this.title = event.title;
      this.pageTitle.setTitle(this.title);

      const meta:MetaDefinition={
        name:'description',
        content:this.title,
      };

      this.metaTags.updateTag(meta)
    });
  }

  ngOnInit(): void {}

  gettingData() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
