import { UploadsFilesService } from './../../services/uploads-files.service';
import { ImgUpdaterServiceService } from './../../services/img-updater-service.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-img',
  templateUrl: './modify-img.component.html',
  styleUrls: ['./modify-img.component.scss'],
})
export class ModifyImgComponent implements OnInit {
  public uploadImage: File;
  public previousImg: any;
  public user: User;
  public closeImgUpdater: boolean = false;
  constructor(
    public imgUpdater: ImgUpdaterServiceService,
    private userService: UserService,
    private uploadFileService: UploadsFilesService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.userRenew;
  }

  showHideImgUpdater() {
    this.previousImg = null;
    this.imgUpdater.hideDialogImgUpdater();
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
    const id = this.imgUpdater.id;
    const type = this.imgUpdater.type;

    this.uploadFileService
      .updatePhoteProfile(this.uploadImage, type, id)
      .then((img) => {
        console.log(img);
        Swal.fire('Image Changed', 'The image was changed', 'success');
        this.imgUpdater.imgChanged.emit(img)//emitiendose la imagen 
        this.showHideImgUpdater();
      })
      .catch((error) => {
        console.log(error);

        Swal.fire('Error', error.error.msg, 'error');
      });
  }
}
