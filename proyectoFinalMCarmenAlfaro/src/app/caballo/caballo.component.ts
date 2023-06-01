import { Component, Injector, OnInit } from '@angular/core';
import { CaballosService } from './caballos.service';
import {
  ConfirmEventType,
} from 'primeng/api';

import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonComponent } from '../common/common.component';


@Component({
  selector: 'app-caballo',
  templateUrl: './caballo.component.html',
  styleUrls: ['./caballo.component.scss'],
})
export class CaballoComponent extends CommonComponent implements OnInit {
  constructor(
    public caballosService: CaballosService,
    readonly injector: Injector) {
      super(injector)
    }
  usuario: UserProfile;
  createNewHorse = false;
  showDialog = false;
  showInfoDialog = false;
  horses = [];
  currentHorse = null;
  currentHorseInfo = null;
  form: FormGroup;
  userTypeAdmin: boolean = false;
  userTypeOwner: boolean = false;
  ownerName: any;
  duenyo;
 

  ngOnInit(): void {
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
  readHorseByOwnerId() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.caballosService
      .getHorseByOnwerId(this.usuario.userId)
      .subscribe((rs) => {
        this.horses = rs;
        console.log(this.horses);
      });
  }

 
  updateHorse() {
    if (this.createNewHorse) {
      this.form.controls.horseType.setValue('Clase');
      this.caballosService.createHorse(this.form.value).subscribe(
        (rs) => {
          if (rs) {
            console.log('Ok');
            this.getAllHorses();
            this.showDialog = false;
            
            this.showMessage('info', 'Caballo creado correctamente.')
          } else {
            this.showMessage('error', 'Error al intentar insertar el caballo')
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.caballosService.updateHorse(this.form.value).subscribe((rs) => {
        if (rs) {
          console.log('Ok');
          this.getAllHorses();
          this.showDialog = false;
          
          this.showMessage('info', 'Caballo modificado correctamente.')
        } else {
          this.showMessage('error', 'Error al intentar modficar el caballo')
        }
      });
    }

    console.log(' caballo guardado ');
    console.log(this.form.value);
    console.log(this.currentHorse);
    //TODO llamada al back
  }

  createForm(horse) {
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
        ownerId: new FormControl(null),
        registrationDate: new FormControl(horse.registrationDate),
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

  verCamara(){
    window.open('https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '_blank');
  }
  

  getAllHorses() {
    this.caballosService.getAllHorses().subscribe(
      (response) => {
        this.horses = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectHorse(horse) {
    this.currentHorse = horse;
    console.log(this.currentHorse);
    this.createForm(horse);
  }
  showInfoHorse(horse) {
    this.currentHorseInfo = horse;
    this.showInfoDialog = true;
  if(horse.ownerId !=null){
    this.caballosService.getOwnerById(horse.ownerId).subscribe((rs) => {
      this.ownerName = rs;
      console.log(this.ownerName)
    });
    }
  }

  deleteHorse(horseId) {
    this.caballosService.deleteHorse(horseId).subscribe(
      (response) => {
        if (response === true) {
          this.getAllHorses();
          this.showMessage('info','Caballo eliminado correctamente')
        } else {
          this.showMessage('error','Error al intentar borrar el caballo')
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deleteHorseDialog(horseId) {
    //TODO meter un cargando
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres borrar este caballo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteHorse(horseId);
      }
    
    });
  }
  clear(table) {
    table.clear();
  }
}
