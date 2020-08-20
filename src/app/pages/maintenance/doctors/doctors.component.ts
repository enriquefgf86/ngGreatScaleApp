import { Doctor } from './../../../models/doctor.model';
import { SearchesService } from 'src/app/services/searches.service';
import { DoctorsService } from './../../../services/doctors.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImgUpdaterServiceService } from 'src/app/services/img-updater-service.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  public imgSubscribedToDestroy: Subscription; //creandose variable en donce se almacenaria imagen previa
  //antes del cambio pra su destruccion despues de culminado el proceso
  public doctors: Doctor[] = [];
  public loading: boolean = true;
  constructor(
    private doctorService: DoctorsService,
    private showHideImgUpdater: ImgUpdaterServiceService,
    private searchService: SearchesService
  ) {}

  ngOnDestroy(): void {
    this.imgSubscribedToDestroy.unsubscribe(); //eliminando la subscripcion a la imagen cambiada una vez hechoi
    //el cambio para evitar la fuga de memoria y demas
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.imgSubscribedToDestroy = this.showHideImgUpdater.imgChanged
      .pipe(delay(1000))
      .subscribe((img) => {
        this.loadDoctors();
      }); //en este caso teniendo en cuenta el evento emitido desde el servicio de img-updater service a tras de su event
    //emiter, captandose el cambio originado en el metodo de uploadimg del componente de modify-img, al cual se le
    //pasa como emit la imagen seleccionada.Vease que todo se iguala a una variable de tipo Subscription llamda
    //imgSubscribedToDestroy, con el fin de que una vez se culmine el proceso proceder a su eliminacion del
    //cache de memoria a traves del metodo ngOnDestroy
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadAllDoctors().subscribe((response) => {
      console.log(response);
      this.doctors = response;
      this.loading = false;
    });
  }

  imgDoctorUpdater(doctor: Doctor) {
    this.showHideImgUpdater.openDialogImgUpdater(
      'doctors',
      doctor.id,
      doctor.img
    );
  }

  searchDoctor(textSearchDoctor: string) {
    if (textSearchDoctor.length == 0) {
      return this.loadDoctors();
    }

    this.searchService
      .search('doctors', textSearchDoctor)
      .subscribe((response: Doctor[]) => (this.doctors = response));
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Delete User?',
      text: `You are going to delete the doctor ${doctor.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.doctorService.deleteDoctor(doctor.id).subscribe((response) => {
          Swal.fire(
            'Deleted!',
            `The doctor ${doctor.name} was correctly deleted`,
            'success'
          );
          this.loadDoctors();
        });
      }
    });
  }
}
