import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics-dognuts',
  templateUrl: './graphics-dognuts.component.html',
})
export class GraphicsDognutsComponent implements OnInit {

  @Input() ChartLabels: Label[] = [];
  @Input() ChartData: MultiDataSet = [];
  @Input() ChartType: ChartType = 'doughnut';
  constructor() {}

  ngOnInit(): void {}
}
