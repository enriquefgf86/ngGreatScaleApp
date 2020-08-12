import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  percentage1: number = 50;
  percentage2: number = 20;

  constructor() {}

  ngOnInit(): void {}


  updatePercentage(event: number) {
    console.log('Event', event);
  }
}
