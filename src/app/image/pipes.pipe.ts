import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
//Pip sirve para transformar la forma visual en que se recibe una informacion
const baseUrl = environment.base_url; //importando el url de conexion al servidor para extraer cierto patrh oi servicio

@Pipe({
  name: 'pipes',
})
export class PipesPipe implements PipeTransform {
  transform(img: string, type: 'users' | 'doctors' | 'hospitals'): string {
    if (!img) {
      return `${baseUrl}/upload/hospitals/no-image`; //no hace falta especificar el type
      //pueds en este caso el request trae una imagen por defecto
    } else if (img.includes('https')) {
      //para saber si el usuario se loggea con google
      return img;
    }
    //creanbdo metodo para recuperar imgaen de usuario loggeado al cual le est creado una instancia en '
    else if (img) {
      return `${baseUrl}/upload/${type}/${img}`;
    } else {
      return `${baseUrl}/upload/hospitals/no-image`; //no hace falta especificar el type
      //pueds en este caso el request trae una imagen por defecto
    }
    //return 'Hola' + img + type;Prueba para ver que retorna dicho pipe
  }
}
