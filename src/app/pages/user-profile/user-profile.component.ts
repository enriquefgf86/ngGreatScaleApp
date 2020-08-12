import { UploadsFilesService } from './../../services/uploads-files.service';
import { Subscriber } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;

  public uploadImage: File;

  public previousImg: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private uploadFileService: UploadsFilesService
  ) {
    this.user = userService.userRenew;
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updtateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUserProfile(this.profileForm.value).subscribe(
      (response) => {
        console.log(response);
        //pudirea hacerse de esta manera
        // this.user.email = response.userDbFieldsUpdated.email;
        // this.user.name = response.userDbFieldsUpdated.name;

        //o de esta manera tambien serviria
        const { email, name } = this.profileForm.value;
        this.user.email = email;
        this.user.name = name;

        Swal.fire('User Saved', 'User was saved', 'success');
      },
      (error) => {
        console.log(error.error.msg);
        Swal.fire('Conflict', error.error.msg, 'error');
      }
    );
  }
  changeImage(file: File) {
    console.log(file);
    this.uploadImage = file;

    if (!file) {
      return (this.previousImg = null);
    }
    const reader = new FileReader();

    const url64Bits = reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      this.previousImg = reader.result;
    };
  }

  uploadChangedImage() {
    this.uploadFileService
      .updatePhoteProfile(this.uploadImage, 'users', this.user.id)
      .then((img) => {
        this.user.img = img;
        console.log(img);
        Swal.fire('Image Changed', 'The image was changed', 'success');
      })
      .catch((error) => {
        console.log(error);

        Swal.fire('Error', error.error.msg, 'error');
      });
  }
}
