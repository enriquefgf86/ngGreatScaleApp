import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hospital } from './hospital.model';

const baseUrl = environment.base_url; //importando el url de conexion al servidor para extraer cierto patrh oi servicio
//de requets
interface doctorUser {
  _id: string;
  name: string;
  email: string;
  img: string;
} //creandose una interface que representaria para la clase model de Doctor el apartado
//de user, puesto que en el endpoint al traerse al doctor se traen los datos del usuario
//que lo creo.vease que no se trae el usuario entero, pues solamento son varios de sus
//elementos
export class Doctor {
  constructor(
    public name: string,
    public id: string,
    public img?: string, // creandose un string opcional para imagen
    public hospital?: Hospital,
    public user?: doctorUser //esepceficiandose que el usuario  traido en el endpoint
  ) //seria de tipo interface doctor User previemnete creado
  {}

  // get getImgUrl() {
  //   if (!this.img) {
  //     return `${baseUrl}/upload/users/no-image`;
  //   } else if (this.img.includes('https')) {
  //     //para saber si el usuario se loggea con google
  //     return this.img;
  //   }
  //   //creanbdo metodo para recuperar imgaen de usuario loggeado al cual le est creado una instancia en '
  //   else if (this.img) {
  //     // console.log(this.img);
  //     // console.log(localStorage.getItem('token'), '    del modelo');

  //     // console.log(`${baseUrl}/upload/users/${this.img}`);

  //     return `${baseUrl}/upload/users/${this.img}`;
  //   } else {
  //     return `${baseUrl}/upload/users/no-image`;
  //   }
  // }
  // get printUser() {
  //   return console.log(this.img, 'coming del modelo');
  // }
}
