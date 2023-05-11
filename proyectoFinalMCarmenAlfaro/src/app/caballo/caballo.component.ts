import { Component, OnInit } from '@angular/core';
import { CaballosService } from './caballos.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-caballo',
  templateUrl: './caballo.component.html',
  styleUrls: ['./caballo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CaballoComponent implements OnInit {

  constructor( 
    public caballosService: CaballosService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService
    ) { }

  showDialog = false
  horses = []
  currentHorse = null
  form: FormGroup

  ngOnInit(): void {
    this.getAllHorses();
  }
  updateHorse(){
    console.log(this.form)
  }

  createForm(horse){
    if(horse){
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
  
      })
    } else {
      this.form = new FormGroup({
        barnNum: new FormControl(''),
        cameraUrl: new FormControl(''),
        foodType: new FormControl(''),
        horseId: new FormControl(''),
        horseName: new FormControl(''),
        horseType: new FormControl(''),
        observation: new FormControl(''),
        ownerId: new FormControl(''),
        registrationDate: new FormControl(''),
  
      })

      this.currentHorse = true
    }
    
   
    this.showDialog = true
    console.log(this.form)
  }

  getAllHorses(){
    this.caballosService.getAllHorses().subscribe(
      (response) => {
        this.horses = response
        console.log(response)
        
      },  (error ) => {
        console.error(error);  
        //this.errorMessage=true;
      }
   
    );
  }
  selectHorse(horse){
    this.currentHorse = horse;
    console.log(this.currentHorse)
    this.createForm(horse)
    
  }

  deleteHorse(horseId){

this.caballosService.deleteHorse(horseId).subscribe(
  (response) => {
    if(response === true){
      this.getAllHorses();
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Caballo eliminado correctamente' });
    }else {
      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Error al intentar borrar el caballo' });
    }
   
    
    
  },  (error ) => {
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
          this.deleteHorse(horseId)
            
        },
        reject: (type) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

}
