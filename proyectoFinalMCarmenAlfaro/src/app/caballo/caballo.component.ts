import { Component, OnInit } from '@angular/core';
import { CaballosService } from './caballos.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';


import { UserProfile } from '../entities/userProfile/userProfile.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-caballo',
  templateUrl: './caballo.component.html',
  styleUrls: ['./caballo.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CaballoComponent implements OnInit {
  constructor(
    public caballosService: CaballosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  usuario: UserProfile;
  createNewHorse = false;
  showDialog = false;
  showInfoDialog=false
  horses = [];
  currentHorse = null;
  currentHorseInfo= null
  form: FormGroup;
  userTypeAdmin: boolean = false;
  userTypeOwner: boolean = false;
  ownerName:any;
  foodHorseTypes = [
    { name: 'Hierba' },
    { name: 'Forraje' },
    { name: 'Heno' },
    { name: 'Paja' }
  ]

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





  // readOwner(){

  //     this.caballosService.getOwnerById(horse.ownerId).subscribe(
  //       rs =>{
  //         this.ownerName=rs
  //       }
  //     )
      
  //   });
    
  // }
  updateHorse() {
    if (this.createNewHorse) {
      this.form.controls.horseType.setValue('Clase');
      this.caballosService.createHorse(this.form.value).subscribe(
        (rs) => {
          if (rs) {
            console.log('Ok');
            this.getAllHorses();
            this.showDialog=false;
            this.messageService.add({
              severity: 'info',
              summary: 'Insercción correcta',
              detail: 'Caballo creado correctamente.',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'Error al intentar insertar el caballo',
            });
          }
        },
        (error) => {
          console.error(error);
          //this.errorMessage=true;
        }
      );
    } else {
      this.caballosService.updateHorse(this.form.value).subscribe(rs=>{
        if (rs) {
          console.log('Ok');
        this.getAllHorses();
          this.showDialog=false;
          this.messageService.add({
            severity: 'info',
            summary: 'Modifición correcta',
            detail: 'Caballo modificado correctamente.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Error al intentar modficar el caballo',
          });
        }
      })

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
        ownerId: new FormControl(horse.ownerId),
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

  // getAllHorses() {
  //   this.caballosService.getAllHorses().subscribe(
  //     (response) => {
  //       this.horses = response;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error(error);
  //       //this.errorMessage=true;
  //     }
  //   );
  // }
  getAllHorses() {
    this.caballosService.getAllHorses().subscribe(
      (response) => {
        this.horses = response;
        console.log(response);
  
        const ownerRequests = [];
  
        for (let horse of this.horses) {
          if (horse.ownerId) {
            ownerRequests.push(this.caballosService.getOwnerById(horse.ownerId));
          } else {
            horse.ownerName = "Sin dueño";
          }
        }
  
        if (ownerRequests.length > 0) {
          forkJoin(ownerRequests).subscribe((ownerResponses) => {
            for (let i = 0; i < ownerResponses.length; i++) {
              this.horses[i].ownerName = ownerResponses[i].userName;
            }
  
            console.log(this.horses);
          });
        } else {
          console.log(this.horses);
        }
      }
    );
  }

  selectHorse(horse) {
    this.currentHorse = horse;
    console.log(this.currentHorse);
    this.createForm(horse);
  }
  showInfoHorse(horse){
    this.currentHorseInfo = horse;
    this.showInfoDialog=true;

  }
  deleteHorse(horseId) {
    this.caballosService.deleteHorse(horseId).subscribe(
      (response) => {
        if (response === true) {
          this.getAllHorses();
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Caballo eliminado correctamente',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'Error al intentar borrar el caballo',
          });
        }
      },
      (error) => {
        console.error(error);
        //this.errorMessage=true;
      }
    );
  }
  deleteHorseDialog(horseId) {
    //TODO meter un cargando
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteHorse(horseId);
      },
      reject: (type) => {
        switch (type) {
        
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
  clear(table) {
    table.clear();
  }
}
