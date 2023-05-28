import { Component } from '@angular/core';
import { GestionService } from '../gestion/gestion.service';
import { CaballosService } from '../caballo/caballos.service';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { SugerenciasService } from './sugerencias.service';

@Component({
  selector: 'app-sugerencias-reservas',
  templateUrl: './sugerencias-reservas.component.html',
  styleUrls: ['./sugerencias-reservas.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SugerenciasReservasComponent {
  suggestions = [];
  suggestionArchived = [];
  suggestion;
  reserva
  reservasRs=[];
  reservasArcvhived=[]
  currentSuggestion;
  currentReserva;
  peticionArchivo = false;

  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public sugerenciasService: SugerenciasService
  ) {}
  ngOnInit(): void {
    this.readSuggestion();
    this.readReserva();
  }

  readSuggestion() {
    this.suggestionArchived=[]
    this.suggestions=[]
    this.gestionService.readSuggestions().subscribe((rs) => {
      rs.forEach((visto) => {
        if (visto.checked == true) {
          this.suggestionArchived.push(visto);
        } else {
          this.suggestions.push(visto);
        }
      });

      console.log(rs);
    });
  }
  readReserva() {
    this.reservasRs=[]
    this.reservasArcvhived=[]
    this.gestionService.readReservas().subscribe((rs) => {
      rs.forEach((visto) => {
        if (visto.checked == true) {
          this.reservasArcvhived.push(visto);
        } else {
          this.reservasRs.push(visto);
        }
      });
      console.log(rs);
    });
  }

  checkedSuggestion(suggestion) {
    this.currentSuggestion = suggestion;
    this.suggestion = {
      id: this.currentSuggestion.id,
      commentType: this.currentSuggestion.commentType,
      userName: this.currentSuggestion.userName,
      emailUser: this.currentSuggestion.emailUser,
      peticion: this.currentSuggestion.emailUser,
      checked: true,
    };
    console.log(this.suggestion);
    this.sugerenciasService
      .updateSuggestion(this.currentSuggestion.id, this.suggestion)
      .subscribe((rs) => {
    if(rs){
      this.readSuggestion()
    }
      });
  }
  checkedReserva(reserva) {
    this.currentReserva = reserva;
    console.log(this.currentReserva)
    this.reserva = {
      reservationId: this.currentReserva.reservationId,
      reservationName: this.currentReserva.reservationName,
      excursionType: this.currentReserva.excursionType,
      emailAddress: this.currentReserva.emailAddress,
      numPeople: this.currentReserva.numPeople,
      dateExcursion: this.currentReserva.dateExcursion,
      checked: true,
    }; 
    this.sugerenciasService
      .updateReserva(this.currentReserva.reservationId, this.reserva)
      .subscribe((rs) => {
       if(rs){
        this.readReserva()
       }
      });
  }
  deleteReserva(id) {
    this.sugerenciasService.deleteReserva(id).subscribe((rs) => {
      rs;
      if (rs) {
        this.readReserva();
      }
    });
  }
  deleteReservaDialog(reserva) {
    this.currentReserva = reserva;
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar ésta reseva?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteReserva(this.currentReserva.reservationId);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Has cancelado la acción',
            });
            break;
        }
      },
    });
  }
  deleteSuggestion(id) {
    this.sugerenciasService.deleteSuggestion(id).subscribe((rs) => {
      rs;
      if (rs) {
        this.readSuggestion();
      }
    });
  }
  deleteSugestionDialog(suggestion) {
    this.currentSuggestion = suggestion;
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar ésta petición?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSuggestion(this.currentSuggestion.id);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Has cancelado la acción',
            });
            break;
        }
      },
    });
  }
}
