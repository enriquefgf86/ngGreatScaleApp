import { DoctorsService } from './../../../services/doctors.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalServiceService } from 'src/app/services/hospital-service.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
// import { error } from 'console';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected: Hospital;
  public doctorSelected: Doctor;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalServiceService,
    private doctorService: DoctorsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.getADoctotr(params.id)
    );

    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.doctorForm.get('hospital').valueChanges.subscribe((response) => {
      this.hospitalSelected = this.hospitals.find(
        (element) => element.id === response
      );
      console.log(this.hospitalSelected);
    }); //En este caso se estaria trabajando con el valor de cambio que ocupa la imagen, correspondiente
    // a lo traido en el reactive form en el apartdo de hospital que dicho sea de paso es de tipo hospital
    // que al ser un observable  nos daria la oportunidad dde percibir cualquier cambio en el mismo (valueChanges)
    //, y suscribirnos a dicho cambio para trabajar con la data mostrada.Vease que la resppnse lo que traeria seria un id , de acuerdo con lo establecido
    //en el value del componente html, Luego en tonces se procedieria a comparar el array de hospitales traido desde
    //el servicio, con cualesquiera el elemento seleccionado mediante reactive formen el html(id del hospital).Vease entonces
    //que se accede al array de hospitales y atraves del metodo find, se mapea diachoi array teniendo como
    //referencia el item id, y el mismo se compararia con el response que contiene el id traido desde el reactive
    //form , mostrando asi la coincidencia

    this.loadHospitals();
  }

  loadHospitals() {
    this.hospitalService.loadHospitals().subscribe((response) => {
      this.hospitals = response;
    });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    if (this.doctorSelected) {
      const data = { ...this.doctorForm.value, id: this.doctorSelected.id }; //Desestructurando
      // todo lo referente a lo traido en el reactive this.formBuilder, admeas de mandar
      // el id que nos trae el medico selecccionado , pues estos parametros son los necesarios
      // para el update segun el endpoint(name,hospital,id)
      this.doctorService.updateDoctor(data).subscribe((response) => {
        console.log(response);

        Swal.fire(
          'Doctor Updated',
          `The doctor ${name} was updated`,
          'success'
        );
      });
    } else {
      this.doctorService
        .createDoctor(this.doctorForm.value)
        .subscribe((response: any) => {
          console.log(response);
          console.log(this.doctorForm.value);

          Swal.fire(
            'Doctor Created',
            `The doctor ${name} was created`,
            'success'
          );
          this.router.navigate([`/doctor/${response.doctor.id}`]);
        });
    }
  }
  getADoctotr(id: string) {
    if (id === 'nuevo') {
      return;
    } //especificandose que si el endpoint de modificar o crear un doctor termina con un id que
    //tenga como string nuevo, en tonces no se procederia a hacer nada

    this.doctorService
      .getADoctorById(id)
      .pipe(delay(100))
      .subscribe((response: any) => {
        console.log(response, 'Aqui');

        if (response == undefined || response == null || !response) {
          return this.router.navigate(['/doctors']);
        } //especificandose que si de existir un id pasando la primera condicon
        //cuando se suscribve a ese endpoint no existe nada , se procederia
        //a redireccionar el usuario a la pagina de home

        const {
          name,
          hospital: { _id },
        } = response; //desagregando la respuesta en dos constantes propias
        //de ese api, el nombre y el _id del hospital

        this.doctorSelected = response;
        this.doctorForm.setValue({ name, hospital: _id }); //estableciendo los valore spor defecto
        //del formulario cuando se cargue un medico ya existente para su edicion y demas
      });
  }
}
