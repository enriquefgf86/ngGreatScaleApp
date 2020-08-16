import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ImgUpdaterServiceService {
  public type: 'users' | 'doctors' | 'hospitals';
  public id: string;
  public actualImg: string;

  public imgChanged: EventEmitter<string> = new EventEmitter<string>();//Se inicializa un event emitter
  //al cual se le pasara como valor uun string al cual se pudirea suscribir desde cualquier componente
  //de la aplicacion

  private dialogImgUpdater: boolean = true;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token');
  }

  get headers() {
    return {
      headers: {
        'user-token': this.token,
      },
    };
  }

  get hideImgUpdater() {
    return this.dialogImgUpdater;
  }

  openDialogImgUpdater(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    actualImg: string = 'no-image'
  ) {
    this.dialogImgUpdater = false;
    this.type = type;
    this.id = id;
    this.actualImg = actualImg;

    if (actualImg.includes('https')) {
      this.actualImg = actualImg;
    } else {
      this.actualImg = `${baseUrl}/upload/${type}/${actualImg}`;
    }
  }

  hideDialogImgUpdater() {
    this.dialogImgUpdater = true;
  }
}
