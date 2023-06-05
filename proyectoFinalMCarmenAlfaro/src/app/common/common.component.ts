import { Component, Injector } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingHorseComponent } from '../loading-horse/loading-horse.component';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent {
  loadingModal
  horseType=[{name:'Privado'}, {name:'Clase'}]
  payMethods = [ { name: 'Pendiente' },{ name: 'Efectivo' }, { name: 'Tarjeta' }];
  foodHorseTypes = [{ name: 'Hierba' },{ name: 'Forraje' },{ name: 'Heno' },{ name: 'Paja' },];
  levelUser = [{ name: 'Bajo' }, { name: 'Medio' }, { name: 'Alto' }];
  userTypes = [{ name: 'Alumno' }, { name: 'Dueño' }, { name: 'Admin' }, { name: 'Invitado' },
              { name: 'Inactivo' }];

  


  protected dialogService: DialogService
  protected messageService: MessageService
  protected confirmationService: ConfirmationService

  
  constructor(injector: Injector) {
    this.dialogService = injector.get(DialogService)
    this.messageService = injector.get(MessageService)
    this.confirmationService = injector.get(ConfirmationService)
   }

  showLoading(){
  
  
    this.loadingModal =this.dialogService.open(LoadingHorseComponent, { 
      showHeader: false,
          closable: false,
          closeOnEscape: false,
          styleClass: 'loading',
          width: '60vw',
          height: '60vh'
          
    });
  
   
      }

  closeLoading(){
    if (this.loadingModal) {
      try {
        this.loadingModal.close()
        this.loadingModal = undefined
      } catch {}
    }
  }

  showMessage(severity, detail){
    let summary;
    console.log(severity)
    if(severity === "error"){
      summary = '¡Ups! Algo no ha ido bien'
    }
    if(severity === "info"){
      summary = '¡Genial!'
    }
      this.messageService.add({
        severity: severity,
        summary: summary,
        detail: detail,
      });
    
  }
}
