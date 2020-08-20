import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { LoadUsers } from '../interfaces/load-user.interface';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';
const baseUrl = environment.base_url; //vease que se inicializa una variable (baseUrl)que hace referencia  al url
//del local host inicializado  en nustro file de enviroment , accediendose a traves de el a la variable que
//recoge dicha variable de conexion con nuestro backend(base_url)

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
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

  private transformAnyToUser(result: any[]): User[] {
    //especificandose que el metodo recibe cierta Data(result),
    return result.map(
      //de tipo any , y su salida debe ser de tipo User
      (
        user: any //creando la instancia de Usuario
      ) =>
        new User(
          user.name,
          user.email,
          '',
          user.id,
          user.role,
          user.google,
          user.img
        )
    );
  }

  private transformAnyToHospital(result: any[]): Hospital[] {
    //especificandose que el metodo recibe cierta Data(result),
    return result;
    // .map(                            //de tipo any , y su salida debe ser de tipo User
    //   (hospital: any) =>                              //creando la instancia de Usuario
    //     new Hospital(
    //       hospital.name,
    //       hospital.id,
    //       hospital.img,
    //       hospital.user,
    //     )
    // );
  }

  private transformAnyToDoctor(result: any[]): Doctor[] {
    //especificandose que el metodo recibe cierta Data(result),
    return result;
    // .map(                            //de tipo any , y su salida debe ser de tipo User
    //   (hospital: any) =>                              //creando la instancia de Usuario
    //     new Hospital(
    //       hospital.name,
    //       hospital.id,
    //       hospital.img,
    //       hospital.user,
    //     )
    // );
  }

  search(type: 'users' | 'doctors' | 'hospitals', word: string) {
    const url = `${baseUrl}/allSearch/specific/${type}/${word}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map(
        (response: any) => {
          switch (type) {
            case 'users':
              return this.transformAnyToUser(response.result);

            case 'hospitals':
              return this.transformAnyToHospital(response.result);

              case 'doctors':
              return this.transformAnyToDoctor(response.result);

            default:
              return [];
          }
        }
        // response.result
        // console.log(response.result);
      )
    );
  }
}
