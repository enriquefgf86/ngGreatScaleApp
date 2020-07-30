import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
declare const gapi: any;
// declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormSubmitted = false;
  public auth2: any;

  public loginForm = this.formbuilder.group({
    //Inicializando el form builder para el sign up
    // name: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    // confirmPassword: ['', Validators.required],
    rememberCheck: [false],
  });
  constructor(
    public router: Router,
    private formbuilder: FormBuilder,
    private loginService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  loginUser() {
    console.log(this.loginForm);
    this.loginService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (this.loginForm.get('rememberCheck').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);

        Swal.fire('Error', error.error.msg, 'error');
      }
    );
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.loginService.googleInit();
    this.auth2 = this.loginService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        this.loginService.loginUserGoogle(id_token).subscribe((response) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/dashboard');
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }
}
