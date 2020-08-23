import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  public registerForm = this.formbuilder.group(
    {
      //Inicializando el form builder para el sign up
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      termCheck: [false, Validators.required],
    },
    {
      validators: this.equalPasswords('password', 'confirmPassword'),
    }
  );

  constructor(
    private formbuilder: FormBuilder,
    private createUserService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  createUser() {
    this.formSubmitted = true;
    // console.log(this.registerForm);

    if (this.registerForm.invalid) {
      // console.log('Error on Registering Form');
      return;
    } else {
      this.createUserService.createUser(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          console.log('user created');
          this.router.navigate(['/dashboard'])
        },
        (error) => {
          Swal.fire('Error ', error.error.msg, 'error');
        }
      );
    }
  }

  noValidFields(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  checkTermsState() {
    return !this.registerForm.get('termCheck').value && this.formSubmitted;
  }

  noValidPasswords() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('confirmPassword').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  equalPasswords(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(password1);
      const pass2 = formGroup.get(password2);

      if (pass1.value === pass2.value) {
        pass2.setErrors(null);
      } else {
        pass2.setErrors({ notEqual: true });
      }
    };
  }
}
