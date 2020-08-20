import { Doctor } from './../models/doctor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const baseUrl = environment.base_url; //vease que se inicializa una variable (baseUrl)que hace referencia  al url
//del local host inicializado  en nustro file de enviroment , accediendose a traves de el a la variable que
//recoge dicha variable de conexion con nuestro backend(base_url)

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
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

  loadAllDoctors() {
    const url = `${baseUrl}/doctor`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map(
          (response: { ok: boolean; allDoctors: Doctor[] }) =>
            response.allDoctors
        )
      );
  }

  createDoctor(doctor: { name: string; hospital: string }) {
    const url = `${baseUrl}/doctor`;

    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${baseUrl}/doctor/${doctor.id}`;

    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(id: string) {
    const url = `${baseUrl}/doctor/${id}`;

    return this.http.delete(url, this.headers);
  }
  getADoctorById(id: string) {
    const url = `${baseUrl}/doctor/${id}`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((response: { ok: boolean; doctor: Doctor }) => response.doctor)
      );
  }
}
