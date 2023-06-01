import { Component, OnInit } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ClasesService } from './clases.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GestionService } from '../gestion/gestion.service';
import { PagosService } from '../pagos/pagos.service';
import { PreciosService } from '../precios/precios.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ClasesComponent implements OnInit {
  clases: any = [];
  userClassForm: FormGroup;
  showDialog = false;
  usuarios: any = [];
  noUsers = false;
  currentUser;
  allUsers = [];
  classesDayHour = [];
  selectedUser = null;
  selectedClass = null;
  showDialogAddUser = false;
  selectedLevel = null;
  newClassUser: any;
  insertButtonDisabled = false;
  newPayment
  currentDate= new Date()
  barnPrice=[]
  levelUser = [{ name: 'Bajo' }, { name: 'Medio' }, { name: 'Alto' }];
  constructor(
    public clasesService: ClasesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private gestionService: GestionService,
    public pagosService: PagosService,
    private preciosService: PreciosService
  ) {}
  ngOnInit(): void {
    this.getClasses();
  }

  getClasses() {
    this.clasesService.getAllClassesOrderBy().subscribe((rs) => {
      this.clases = rs;

    });
  }

  onChange(event) {
    this.clasesService
      .getAllClassesByLevel(event.value.name)
      .subscribe((rs) => {
        if (rs) {
          this.classesDayHour = rs;
        }

      });
  
  }
  onChange2(event) {
    

  }
  addUserToClass() {
    if (this.allUsers.length <= 0) {
      this.gestionService.readAllUser().subscribe((rs) => {
        if (rs && rs.length > 0) {
          rs.forEach((user) => {
            if (user.userType === 'Alumno') {
              this.allUsers.push(user);
            }
          });
        }
        this.showDialogAddUser = true;
      });
    }


  }
  getPrices(){
  this.preciosService.getReadAllPrices().subscribe(rs=>{
    console.log(rs)
    rs.forEach(clases => {
      if(clases.typeService=="Clase"){
      this.barnPrice.push(clases)
      console.log(this.barnPrice)
      console.log(this.barnPrice[0].priceId)
      }
     } )
    });

  }

  insertUserToClass() {
    this.insertButtonDisabled = true;
    this.newClassUser = {
       userId: this.selectedUser.userId,
      classId: this.selectedClass.classId
     
    };
    this.getPrices()
    console.log(this.newClassUser)
    this.clasesService.insertUserToClass(this.newClassUser).subscribe(rs=>{
      rs
      console.log(rs)  
      //TODO  poner toast
        console.log("se ha creado la clase")
      if(rs){
     
        this.insertButtonDisabled = false;
        this.showDialogAddUser = false;
        this.newPayment={
          userId:this.selectedUser.userId,
          payMethod:'Pendiente',
          payDate: this.currentDate,
          priceId:this.barnPrice[0].priceId
        }
    
        console.log(this.newPayment)
        this.pagosService.createNewPayment(this.newPayment).subscribe(rs=>{
          rs
          if(rs){
             console.log("se ha creado el pago para este usuario")
          }
          //todo poner toast
         
        })
        
      }
    
    })
  }
  deleteClass(classToDelete) {
    // TODO obtener el ID de userClass. el ID siempre devuelve 0 el back.
    this.clasesService.deleteClassUser(classToDelete).subscribe((rs) => {
      if (rs) {
        this.getClasses();
        this.showDialog = false;
      }
    });
  }

  deleteClassDialog(classToDelete) {
    console.log(classToDelete);
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres borrar éste usuario de la clase?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteClass(classToDelete);
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

  showInfoClasses() {
    this.showDialog = true;
  }
  clear(table) {
    table.clear();
  }

  saberClaseLunes(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Lunes', classHour).subscribe(
      (rs) => {
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      },
      (error) => {
        this.noUsers = true;
      }
    );
    this.showDialog = true;
  }
  saberClaseMiercoles(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Miercoles', classHour).subscribe(
      (rs) => {
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      },
      (error) => {
        this.noUsers = true;
      }
    );
    this.showDialog = true;
  }
  saberClaseJueves(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Jueves', classHour).subscribe(
      (rs) => {
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      },
      (error) => {
        this.noUsers = true;
      }
    );
    this.showDialog = true;
  }
  saberClaseViernes(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Viernes', classHour).subscribe(
      (rs) => {
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      },
      (error) => {
        this.noUsers = true;
      }
    );
    this.showDialog = true;
  }
  saberClaseSabado(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Sabado', classHour).subscribe(
      (rs) => {
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      },
      (error) => {
        this.noUsers = true;
      }
    );
    this.showDialog = true;
  }
  saberClaseMartes(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Martes', classHour).subscribe(
      (rs) => {
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      },
      (error) => {
        this.noUsers = true;
      }
    );
    this.showDialog = true;
  }
}
