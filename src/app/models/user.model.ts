import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base_url; //importando el url de conexion al servidor para extraer cierto patrh oi servicio
//de requets

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public id?: string,
    public role?: 'ADMIN_ROLE'|'USER_ROLE',
    public google?: boolean,
    public img?: string
  ) {}

  get getImgUrl() {
    if (!this.img) {
      return `${baseUrl}/upload/users/no-image`;
    } else if (this.img.includes('https')) {
      //para saber si el usuario se loggea con google
      return this.img;
    }
    //creanbdo metodo para recuperar imgaen de usuario loggeado al cual le est creado una instancia en '
    else if (this.img) {
      // console.log(this.img);
      // console.log(localStorage.getItem('token'), '    del modelo');

      // console.log(`${baseUrl}/upload/users/${this.img}`);

      return `${baseUrl}/upload/users/${this.img}`;
    } else {
      return `${baseUrl}/upload/users/no-image`;
    }
  }
  // get printUser() {
  //   return console.log(this.img, 'coming del modelo');
  // }
}
