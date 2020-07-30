import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterFormInterface } from '../interfaces/registerForm.interface';
import { environment } from 'src/environments/environment';
import { LoginFormInterface } from '../interfaces/loginFormInterface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
declare const gapi: any;
//Este servicio seria el encargado de hacer todos los servicos con el back end y demas

const baseUrl = environment.base_url; //vease que se inicializa una variable (baseUrl)que hace referencia  al url
//del local host inicializado  en nustro file de enviroment , accediendose a traves de el a la variable que
//recoge dicha variable de conexion con nuestro backend(base_url)

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  //Se inicializa el construcotr con los modules o importaciones a usar para su ejecucion .,El primero de
  //ellos eria el propio de Angular utilizado para hacer request al servidos (HttpClient), y se le asigna
  //a la variable http
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  validateTokenRenew(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${baseUrl}/login/renew`, {
        headers: {
          'user-token': token,
        },
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.renewToken);
        }),
        map((response: any) => true),
        catchError((error) => of(false))
      );
  }

  //======================================
  //Creando el Usuario
  //=====================================
  createUser(formData: RegisterFormInterface) {
    console.log('creating user');

    return this.http.post(`${baseUrl}/user`, formData).pipe(
      tap((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
      })
    );
  } //Este seria el metodo de conexion a nuestra base de datos que triggeriza la creacion de un usuario
  //para ello primero es necesario pasarle a dicho post el formulario o form que se usara para que elmismo se trigerize
  //por ello se pasa como paramtro una variable llamada formData , de tipo RegisterFormInterface , que no seria mas
  //que un tipo de clase creada a forma y semjanza de los paramtros del formBuilder , y que teniendo en cuenta su
  //validacion  seria retornado en el post a traves de el http(variable creada que inicializa el paquete de Angular
  //HttpClient), especificamente accediendose a traves del metodo post, en donde como primer paramewtro se
  //pasa el url al cual se hace el post  especifico, y como segundo parametro se pasaria esa interface asiganada
  //a la variable formdata

  //======================================
  //loggeando el Usuario
  //=====================================
  loginUser(loginData: LoginFormInterface) {
    console.log('loggin use');
    return this.http.post(`${baseUrl}/login`, loginData).pipe(
      tap((response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        // this.router.navigate(['/dashboard'])
      })
    );
  }
  loginUserGoogle(token) {
    console.log('logging user');
    return this.http.post(`${baseUrl}/login/google`, { token }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        console.log(response);
      })
    );
  }

  googleInit() {
    return new Promise((resolve) => {
      console.log('google init ');

      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '980795418978-5bpklk8rngjkuvqtgdld8qbq4sv907jq.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  logOut() {
    localStorage.removeItem('token'),
      this.auth2.signOut().then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
          console.log('User signed out.');
        });
      });
  }
}
