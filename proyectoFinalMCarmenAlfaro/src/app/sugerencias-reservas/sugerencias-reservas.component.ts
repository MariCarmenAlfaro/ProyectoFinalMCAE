import { Component } from '@angular/core';
import { GestionService } from '../gestion/gestion.service';
import { CaballosService } from '../caballo/caballos.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SugerenciasService } from './sugerencias.service';

@Component({
  selector: 'app-sugerencias-reservas',
  templateUrl: './sugerencias-reservas.component.html',
  styleUrls: ['./sugerencias-reservas.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SugerenciasReservasComponent {
  suggestions:any;
  peticion=false;
  reserva=false;
  reservasRs:any;
  
  constructor(
    public gestionService: GestionService,
    public caballosService: CaballosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public sugerenciasService: SugerenciasService
  ) {}
  ngOnInit(): void {
    this.readSuggestion()
    this.readReserva()
  }

  peticiones(){
    this.peticion=true;
    this.reserva=false;
  }
  reservas(){
    this.reserva=true;
    this.peticion=false;
  }
  readSuggestion(){
    this.gestionService.readSuggestions().subscribe(
      rs=>{
      this.suggestions= rs
    console.log(rs)
      }
    )  
  }
  readReserva(){
    this.gestionService.readReservas().subscribe(
      rs=>{
      this.reservasRs= rs
    console.log(rs)
      }
    )
  }
// checked(){
// this.suggestions={
//   commentType= ,
// userName ,
// emailUser ,
// peticion ,

// checked =,
// }

//   this.sugerenciasService.updateSuggestion().subscribe(rs=>{
//     rs
//   })
// }



  deleteSuggestion(id){
    this.sugerenciasService.deleteSuggestion(id).subscribe(rs=>{
      rs
    })
  }

}
