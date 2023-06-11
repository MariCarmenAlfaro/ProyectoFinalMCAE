import { Component, Injector, OnInit } from '@angular/core';
import { CaballosService } from './caballos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonComponent } from '../common/common.component';
import { GestionService } from '../gestion/gestion.service';

@Component({
  selector: 'app-caballo',
  templateUrl: './caballo.component.html',
  styleUrls: ['./caballo.component.scss'],
})
export class CaballoComponent extends CommonComponent implements OnInit {
  constructor(
    public caballosService: CaballosService,
    public gestionService: GestionService,
    readonly injector: Injector
  ) {
    super(injector);
  }
  usuario;
  createNewHorse = false;
  showDialog = false;
  showInfoDialog = false;
  horses = [];
  currentHorse = null;
  currentHorseInfo = null;
  form: FormGroup;
  userTypeAdmin = false;
  userTypeOwner = false;
  ownerName;
  duenyo;
  userLists = [];
  loading: boolean;

  ngOnInit(): void {
    this.loading = true;
    this.knowUserType();
  }
  knowUserType() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    if (this.usuario.userType == 'Admin') {
      this.userTypeAdmin = true;
      this.getAllHorses();
    } else if (this.usuario.userType == 'Dueño') {
      this.userTypeOwner = true;
      this.readHorseByOwnerId();
    }
  }
  readAllUsers() {
    this.gestionService.readAllUser().subscribe(
      (rs) => {
        if (rs) {
          rs.forEach((users) => {
            if (users.userType == 'Dueño') {
              this.userLists.push(users);
            }
          });
        } else {
          this.showMessage(
            'error',
            'Error al intentar obtener los usuarios dueños'
          );
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  readHorseByOwnerId() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.caballosService.getHorseByOnwerId(this.usuario.userId).subscribe(
      (rs) => {
        if (rs) {
          this.horses = rs;
        } else {
          this.showMessage('error', 'Error al intentar obtener el caballo');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  updateOrCreateHorse() {
    if (this.createNewHorse) {
      this.form.controls.horseType.setValue('Clase');
      this.caballosService.createHorse(this.form.value).subscribe(
        (rs) => {
          if (rs) {
            this.getAllHorses();
            this.showDialog = false;
            this.showMessage('info', 'Caballo creado correctamente.');
          } else {
            this.showMessage('error', 'Error al intentar insertar el caballo');
          }
        },
        (error) => {
          this.showMessage('error', error.error);
        }
      );
    } else {
      this.caballosService.updateHorse(this.form.value).subscribe(
        (rs) => {
          if (rs) {
            this.getAllHorses();
            this.showDialog = false;
            this.showInfoDialog = false;
            this.showMessage('info', 'Caballo modificado correctamente.');
          } else {
            this.showMessage('error', 'Error al intentar modficar el caballo');
          }
        },
        (error) => {
          this.showMessage('error', error.error);
        }
      );
    }
  }

  createForm(horse) {
    this.readAllUsers();
    if (horse) {
      this.createNewHorse = false;
      this.form = new FormGroup({
        barnNum: new FormControl(horse.barnNum),
        cameraUrl: new FormControl(horse.cameraUrl),
        foodType: new FormControl(horse.foodType),
        horseId: new FormControl(horse.horseId),
        horseName: new FormControl(horse.horseName),
        horseType: new FormControl(horse.horseType),
        observation: new FormControl(horse.observation),
        ownerId: new FormControl(horse.ownerId),
        registrationDate: new FormControl(new Date(horse.registrationDate)),
      });
    } else {
      this.createNewHorse = true;
      this.form = new FormGroup({
        horseName: new FormControl(''),
        barnNum: new FormControl(''),
        foodType: new FormControl(''),
        horseType: new FormControl(''),
        observation: new FormControl(''),
        cameraUrl: new FormControl(''),
        registrationDate: new FormControl(''),
        ownerId: new FormControl(null),
      });
      this.currentHorse = true;
    }

    this.showDialog = true;
    console.log(this.form);
  }

  showCamara(horse) {
    window.open(horse.cameraUrl, '_blank');
  }

  getAllHorses() {
    this.caballosService.getAllHorses().subscribe(
      (rs) => {
        if (rs) {
          this.horses = rs;
          this.loading = false;
        } else {
          this.showMessage('error', 'Error al obtener todos los caballos');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }

  selectHorse(horse) {
    this.currentHorse = horse;
    this.createForm(horse);
  }

  showInfoHorse(horse) {
    this.currentHorseInfo = horse;
    this.showInfoDialog = true;
    if (horse.ownerId != null) {
      this.gestionService.getOwnerById(horse.ownerId).subscribe(
        (rs) => {
          if (rs) {
            this.ownerName = rs;
          } else {
            this.showMessage('error', 'Error al obtener el caballo');
          }
        },
        (error) => {
          this.showMessage('error', error.error);
        }
      );
    }
  }

  deleteHorse(horseId) {
    this.caballosService.deleteHorse(horseId).subscribe(
      (rs) => {
        if (rs === true) {
          this.getAllHorses();
          this.showMessage('info', 'Caballo eliminado correctamente');
        } else {
          this.showMessage('error', 'Error al intentar borrar el caballo');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
  }
  
  deleteHorseDialog(horseId) {
    this.confirmationService.confirm({
      message: '¿Estás seguro/a que quieres borrar este caballo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteHorse(horseId);
      },
    });
  }
  clear(table) {
    table.clear();
  }
}
