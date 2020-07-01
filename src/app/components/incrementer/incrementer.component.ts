import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss'],
})
export class IncrementerComponent implements OnInit {
  @ViewChild('textPercentage') textPercentage: ElementRef;

  @Input() percentage: number = 50;
  @Input() legend: string = 'Legend';

  @Output() changeProgress: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChange(newEvent: number) {//funcion para modificar directamente desdee le input

    console.log(newEvent);
    if (newEvent >= 100) {
      this.percentage = 100;
    } else if (newEvent <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newEvent;
    }
    this.textPercentage.nativeElement.value = this.percentage;
    this.changeProgress.emit(this.percentage);
  }

  addRestValue(value: number) {//funcion para modificar directamente desde los aumentadores /disminuidores

    if (this.percentage >= 100 && value >= 100||this.percentage+5>=100) {
      this.percentage = 100;
    } else if (this.percentage <= 0 && value <= 0 ||this.percentage-5>=100) {
      this.percentage = 0;
    } else {
      this.percentage = this.percentage + value;
    }

    this.changeProgress.emit(this.percentage);
  }
}
