import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
const baseUrl = environment.base_url; //vease que se inicializa una variable (baseUrl)que hace referencia  al url
//del local host inicializado  en nustro file de enviroment , accediendose a traves de el a la variable que
//recoge dicha variable de conexion con nuestro backend(base_url)
@Injectable({
  providedIn: 'root',
})
export class HospitalServiceService {
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

  loadHospitals() {
    const url = `${baseUrl}/hospital`;

    return this.http
      .get(url, this.headers)
      .pipe(
        map(
          (response: { ok: boolean; allHospitals: Hospital[] }) =>
            response.allHospitals
        )
      );
  }

  createHospital(name: string) {
    const url = `${baseUrl}/hospital`;

    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(name: string, id: string) {
    const url = `${baseUrl}/hospital/${id}`;

    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(id: string) {
    const url = `${baseUrl}/hospital/${id}`;

    return this.http.delete(url, this.headers);
  }
}
