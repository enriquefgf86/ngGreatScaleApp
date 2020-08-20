import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = environment.base_url; //importando el url de conexion al servidor para extraer cierto patrh oi servicio
//de requets
interface hospitalUser {
  _id: string;
  name: string;
  email: string;
  img: string;
}//creandose una interface que representaria para la clase model de Hospital el apartado
//de user, puesto que en el endpoint al traerse al hospital se traen los datos del usuario
//que lo creo.vease que no se trae el usuario entero, pues solamento son varios de sus
//elementos
export class Hospital {
  constructor(
    public name: string,
    public id: string,
    public img?: string,
    public user?: hospitalUser//esepceficiandose que el usuario  traido en el endpoint
    //seria de tipo interface hospital User previemnete creado
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
