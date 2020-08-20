import { Subscriber, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalServiceService } from 'src/app/services/hospital-service.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { ImgUpdaterServiceService } from 'src/app/services/img-updater-service.service';
import { delay } from 'rxjs/operators';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubscribedToDestroy: Subscription;

  constructor(
    private hospitalService: HospitalServiceService,
    private showHideImgUpdater: ImgUpdaterServiceService,
    private searchService: SearchesService
  ) {}

  ngOnInit(): void {
    this.loadAllHospitals();

    this.imgSubscribedToDestroy = this.showHideImgUpdater.imgChanged
      .pipe(delay(1000))
      .subscribe((img) => {
        this.loadAllHospitals();
      }); //en este caso teniendo en cuenta el evento emitido desde el servicio de img-updater service a tras de su event
    //emiter, captandose el cambio originado en el metodo de uploadimg del componente de modify-img, al cual se le
    //pasa como emit la imagen seleccionada.Vease que todo se iguala a una variable de tipo Subscription llamda
    //imgSubscribedToDestroy, con el fin de que una vez se culmine el proceso proceder a su eliminacion del
    //cache de memoria a traves del metodo ngOnDestroy
  }
  ngOnDestroy(): void {
    this.imgSubscribedToDestroy.unsubscribe(); //eliminando la subscripcion a la imagen cambiada una vez hechoi
    //el cambio para evitar la fuga de memoria y demas
  }

  loadAllHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
      console.log(hospitals);
    });
  }

  saveHospitalChanges(hospital: Hospital) {
    console.log(hospital);

    this.hospitalService
      .updateHospital(hospital.name, hospital.id)
      .subscribe((response) => {
        Swal.fire(
          'Updated',
          `The ${hospital.name} hospital, has been updated`,
          'success'
        );
      });
  }

  deleteHospital(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.deleteHospital(hospital.id).subscribe((response) => {
      this.loadAllHospitals();
      Swal.fire(
        'Deleted',
        `The ${hospital.name} hospital, has been deleted`,
        'success'
      );
    });
  }

  async openPopUpCreateHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create a hospital',
      text: 'Please insert the new Hospital Name',
      input: 'text',
      inputPlaceholder: 'Enter the Hospital Name',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((response: any) => {
        console.log(response);
        //pudiese hacerse esto
        // this.loadAllHospitals();
        // Swal.fire(
        //   'Created',
        //   `The ${response.hospital.name} hospital, has been created`,
        //   'success'
        // );
        //o pudiese hacerse esto tambien

        this.hospitals.push(response.hospital);
        Swal.fire(
          'Created',
          `The ${response.hospital.name} hospital, has been created`,
          'success'
        );
      });
    }
  }
  imgHospitalUpdater(hospital: Hospital) {
    this.showHideImgUpdater.openDialogImgUpdater(
      'hospitals',
      hospital.id,
      hospital.img
    );
    this.loadAllHospitals();
  }

  searchHospital(txtSearchHospital: string) {
    if (txtSearchHospital.length == 0) {
      return this.loadAllHospitals();
    }

    this.searchService
      .search('hospitals', txtSearchHospital)
      .subscribe((response: Hospital[]) => {
        console.log(response);

        this.hospitals = response;
      });
  }
}
