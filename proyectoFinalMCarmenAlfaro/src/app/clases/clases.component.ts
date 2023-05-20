import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClasesService } from './clases.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ClasesComponent implements OnInit {
  clases: any = [];
  form: FormGroup;
  showDialog = false;
  usuarios:any=[];
  noUsers= false;
  constructor(
    public clasesService: ClasesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.clasesService.getAllClassesOrderBy().subscribe((rs) => {
      this.clases = rs;
      console.log(rs);
    });
  }
 
  showInfoClasses() {
    this.showDialog = true;
  }
  clear(table) {
    table.clear();
  }
  saberClaseLunes(classHour: string){
    this.usuarios = []; 
    this.clasesService
        .getUsersByClassId('Lunes', classHour)
        .subscribe((rs) => {
          
          this.usuarios = rs;
          console.log(this.usuarios);
          this.noUsers = false;
         
        },(error) => {
              this.noUsers=true;
            }
          );
    this.showDialog=true;
    } 
    saberClaseMiercoles(classHour: string){
      this.usuarios = []; 
      this.clasesService
          .getUsersByClassId('Miercoles', classHour)
          .subscribe((rs) => {
            
            this.usuarios = rs;
            console.log(this.usuarios);
            this.noUsers = false;
           
          },(error) => {
                this.noUsers=true;
              }
            );
      this.showDialog=true;
    } 
    saberClaseJueves(classHour: string){
      this.usuarios = []; 
      this.clasesService
          .getUsersByClassId('Jueves', classHour)
          .subscribe((rs) => {
            
            this.usuarios = rs;
            console.log(this.usuarios);
            this.noUsers = false;
           
          },(error) => {
                this.noUsers=true;
              }
            );
      this.showDialog=true;
    } 
    saberClaseViernes(classHour: string){
      this.usuarios = []; 
      this.clasesService
          .getUsersByClassId('Viernes', classHour)
          .subscribe((rs) => {
            
            this.usuarios = rs;
            console.log(this.usuarios);
            this.noUsers = false;
           
          },(error) => {
                this.noUsers=true;
              }
            );
      this.showDialog=true;
    } 
    saberClaseSabado(classHour: string){
      this.usuarios = []; 
      this.clasesService
          .getUsersByClassId('Sabado', classHour)
          .subscribe((rs) => {
            
            this.usuarios = rs;
            console.log(this.usuarios);
            this.noUsers = false;
           
          },(error) => {
                this.noUsers=true;
              }
            );
      this.showDialog=true;
    } 
    saberClaseMartes(classHour: string) {
      this.usuarios = []; 
      this.clasesService
          .getUsersByClassId('Martes', classHour)
          .subscribe((rs) => {
            
            this.usuarios = rs;
            console.log(this.usuarios);
            this.noUsers = false;
           
          },(error) => {
                this.noUsers=true;
              }
            );
      this.showDialog=true;
    }
    
}
