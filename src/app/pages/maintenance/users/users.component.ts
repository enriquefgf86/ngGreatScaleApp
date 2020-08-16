import { ImgUpdaterServiceService } from './../../../services/img-updater-service.service';
import { SearchesService } from './../../../services/searches.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { map, delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public imgSubscribedToDestroy: Subscription; //creandose variable en donce se almacenaria imagen previa
  //antes del cambio pra su destruccion despues de culminado el proceso
  public totatUser: number = 0;
  public allUsers: User[] = [];
  public allUsersTemp: User[] = [];
  public pagesFrom: number = 0;
  public chargingMoreUsers: boolean = false;

  constructor(
    private userService: UserService,
    private searchService: SearchesService,
    private showHideImgUpdater: ImgUpdaterServiceService
  ) {}
  ngOnDestroy(): void {
    this.imgSubscribedToDestroy.unsubscribe(); //eliminando la subscripcion a la imagen cambiada una vez hechoi
    //el cambio para evitar la fuga de memoria y demas
  }
  ngOnInit(): void {
    this.loadUsers();
    this.imgSubscribedToDestroy = this.showHideImgUpdater.imgChanged
      .pipe(delay(1000))
      .subscribe((img) => {
        this.loadUsers();
      }); //en este caso teniendo en cuenta el evento emitido desde el servicio de img-updater service a tras de su event
    //emiter, captandose el cambio originado en el metodo de uploadimg del componente de modify-img, al cual se le
    //pasa como emit la imagen seleccionada.Vease que todo se iguala a una variable de tipo Subscription llamda
    //imgSubscribedToDestroy, con el fin de que una vez se culmine el proceso proceder a su eliminacion del
    //cache de memoria a traves del metodo ngOnDestroy
  }

  loadUsers() {
    this.chargingMoreUsers = true;
    this.userService
      .loadUsers(this.pagesFrom)
      .subscribe(({ allUsers, allUsersLength }) => {
        this.totatUser = allUsersLength;
        this.allUsers = allUsers;
        this.allUsersTemp = allUsers; //estableciendo en un array paralelo una actualizacion de usuarios agregados
        this.chargingMoreUsers = false;
      });
  }

  paginate(newPageCount: number) {
    this.pagesFrom = this.pagesFrom + newPageCount;

    if (this.pagesFrom < 0) {
      this.pagesFrom = 0;
    }
    if (this.pagesFrom > this.totatUser) {
      this.pagesFrom = this.totatUser;
    }
    this.loadUsers();
  }

  searchByWords(word: string) {
    if (word.length === 0) {
      return this.allUsers;
    }
    this.searchService.search('users', word).subscribe((response) => {
      this.allUsers = response;
    });
  }
  deleteUser(user: User) {
    if ((user.id = this.userService.idUser)) {
      return Swal.fire(
        'Error',
        `Hola ${user.name} you can't delete yourself`,
        'warning'
      );
    }

    Swal.fire({
      title: 'Delete User?',
      text: `You are going to delete the user ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteSelectedUser(user).subscribe((response) => {
          Swal.fire(
            'Deleted!',
            `The user ${user.name} was correctly deleted`,
            'success'
          );
          this.loadUsers();
        });
      }
    });
  }
  changeUserRole(user: User) {
    this.userService.saveUserRole(user).subscribe((response) => {
      console.log(response);
    });
  }

  imgUpdater(user: User) {
    this.showHideImgUpdater.openDialogImgUpdater('users', user.id, user.img);
    console.log(user);
  }
}
