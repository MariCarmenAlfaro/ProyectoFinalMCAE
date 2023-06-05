import { Component, Injector } from '@angular/core';
import { GestionService } from '../gestion/gestion.service';
import { CaballosService } from '../caballo/caballos.service';
import { ConfirmEventType } from 'primeng/api';
import { SugerenciasService } from './sugerencias.service';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-sugerencias-reservas',
  templateUrl: './sugerencias-reservas.component.html',
  styleUrls: ['./sugerencias-reservas.component.scss'],
})
export class SugerenciasReservasComponent extends CommonComponent {
  suggestions = [];
  suggestionArchived = [];
  suggestion;
  reserva;
  reservasRs = [];
  reservasArcvhived = [];
  currentSuggestion;
  currentReserva;
  peticionArchivo = false;

  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,
    public sugerenciasService: SugerenciasService,
    protected injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.readSuggestion();
    this.readReserva();
  }

  readSuggestion() {
    this.suggestionArchived = [];
    this.suggestions = [];
    this.gestionService.readSuggestions().subscribe((rs) => {
      if (rs) {
        rs.forEach((visto) => {
          if (visto.checked == true) {
            this.suggestionArchived.push(visto);
          } else {
            this.suggestions.push(visto);
          }
        });
      } else {
        this.showMessage('error', 'Error al leer las sugerencias');
      }
    });
  }

  readReserva() {
    this.reservasRs = [];
    this.reservasArcvhived = [];
    this.gestionService.readReservas().subscribe(
      (rs) => {
        if (rs) {
          rs.forEach((visto) => {
            if (visto.checked == true) {
              this.reservasArcvhived.push(visto);
            } else {
              this.reservasRs.push(visto);
            }
          });
        } else {
          this.showMessage('error', 'Error al leer las reservas');
        }
      },
      (error) => {
        this.showMessage('error', error.error);
      }
    );
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

    this.sugerenciasService
      .updateSuggestion(this.currentSuggestion.id, this.suggestion)
      .subscribe((rs) => {
        if (rs) {
          this.readSuggestion();
          this.showMessage('info','Sugerencia realizada!')
        }else{
          this.showMessage('error','Error al modificar las sugerencias')
        }
      },
      (error) => {
        this.showMessage('error',error.error)
      });
  }
  checkedReserva(reserva) {
    this.currentReserva = reserva;
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
        if (rs) {
          this.readReserva();
          this.showMessage('info','¡Reserva realizada!')
        }else{
          this.showMessage('error','Error al modificar las reservas')
        }
      },
      (error) => {
        this.showMessage('error',error.error)
      });
  }
  deleteReserva(id) {
    this.sugerenciasService.deleteReserva(id).subscribe((rs) => {
      if (rs) {
        this.readReserva();
        this.showMessage('info','Reserva eliminada correctamente')
      }else{
        this.showMessage('error','Error al eliminar la reserva')
      }
    });
  }

  deleteReservaDialog(reserva) {
    this.currentReserva = reserva;
    this.confirmationService.confirm({
      message: '¿Estás seguro/a que quieres eliminar ésta reserva?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteReserva(this.currentReserva.reservationId);
      },
    });
  }
  deleteSuggestion(id) {
    this.sugerenciasService.deleteSuggestion(id).subscribe((rs) => {
      rs;
      if (rs) {
        this.readSuggestion();
        this.showMessage('info','Sugerencia eliminada correctamente')
      }else{
        this.showMessage('error','Error al eliminar la sugerencia')
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    });
  }
  deleteSugestionDialog(suggestion) {
    this.currentSuggestion = suggestion;
    this.confirmationService.confirm({
      message: '¿Estás seguro/a que quieres eliminar ésta petición?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSuggestion(this.currentSuggestion.id);
      },
    });
  }
}
