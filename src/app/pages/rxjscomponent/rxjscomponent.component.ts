import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjscomponent',
  templateUrl: './rxjscomponent.component.html',
  styleUrls: ['./rxjscomponent.component.scss'],
})
export class RXJSComponentComponent implements OnInit,OnDestroy {

  susbcription: Subscription
  constructor() {
    // let observable = new Observable((observer) => {
    //   let contador = 0;

    //   let interval = setInterval(() => {
    //     contador = contador + 1;
    //     observer.next(contador);
    //     if (contador === 3) {
    //       clearInterval(interval);
    //       observer.complete();
    //     }
    //     if (contador === 2) {
    //       clearInterval(interval);
    //       observer.error('Error blossom number' + contador);
    //     }
    //   }, 1000);
    // });

    this.susbcription=this.returningObservable().subscribe((number) => {
      console.log('subs', number),
        (error) => console.log('error en observer', error),
        () => console.log('o bserver finished');
    });
  }

  ngOnInit(): void {}

  ngOnDestroy():void{
    console.log('left the page');
    this.susbcription.unsubscribe()

  }

  returningObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;

      let interval = setInterval(() => {
        contador = contador + 1;

        const salida = {
          valor: contador,
        };
        observer.next(salida);
        // if (contador === 7) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
      }, 1000);
    }).pipe(
      map((response) => response.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
