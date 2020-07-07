import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.scss'],
})
export class PromisesComponent implements OnInit {
  constructor() {
    let promise = new Promise((resolve, reject) => {
      let counter = 0;
     
      let interval=setInterval(() => {
        counter = counter + 1;
        console.log(counter);

        if(counter==3){
          resolve();
          clearInterval(interval)
        }
      }, 1000);
    });

    promise.then(()=>{
      console.log("it finished");

    }).catch((error)=>{
      console.log(error);

    })
  }

  ngOnInit(): void {}
}
