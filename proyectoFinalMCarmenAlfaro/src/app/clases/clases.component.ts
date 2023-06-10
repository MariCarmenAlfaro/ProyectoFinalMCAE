import { Component, Injector, OnInit } from '@angular/core';
import {
  ConfirmEventType,
} from 'primeng/api';
import { ClasesService } from './clases.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GestionService } from '../gestion/gestion.service';
import { PagosService } from '../pagos/pagos.service';
import { PreciosService } from '../precios/precios.service';
import { CommonComponent } from '../common/common.component';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
})
export class ClasesComponent extends CommonComponent implements OnInit {
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
  loading: boolean;
  currentDate= new Date()
  barnPrice=[]
  constructor(
    public clasesService: ClasesService,
    private gestionService: GestionService,
    public pagosService: PagosService,
    private preciosService: PreciosService,
    protected injector: Injector
    ) {
      super(injector)
    }
  ngOnInit(): void {
     this.loading = true;
    this.getClasses();
   
  }

  getClasses() {
    this.clasesService.getAllClassesOrderBy().subscribe((rs) => {
      if(rs){
        this.clases = rs;
        this.loading = false;
      } else {
        this.showMessage('error','Error al obtener las clases')
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    });
  }

  onChange(event) {
    this.clasesService
      .getAllClassesByLevel(event.value.name)
      .subscribe((rs) => {
        if (rs) {
          this.classesDayHour = rs;
        }else {
          this.showMessage('error','Error al obtener las clases')
        }
      },
      (error) => {
        this.showMessage('error',error.error)
      });
  
  }
  verificarBotonClase(){
    if((this.selectedClass && this.selectedLevel && this.selectedUser) !=null ) {
      return false
    } else {
      return true
    }
  }
  addUserToClass() {
    debugger
    this.selectedClass=null
    this.selectedLevel=null
    this.classesDayHour= []
    this.selectedUser=null
    if (this.allUsers.length <= 0) {
      this.gestionService.readAllUser().subscribe((rs) => {
        if (rs && rs.length > 0) {
          rs.forEach((user) => {
            if (user.userType === 'Alumno') {
              this.allUsers.push(user);
            }
          });
          this.showDialogAddUser = true;
        } else {
          this.showMessage('error','Error al añadir usuario a la clase')
        }
      },
      (error) => {
        this.showMessage('error',error.error)
      });
    } else {
      this.showDialogAddUser = true;
    }


  }
  getPrices(){
  this.preciosService.getReadAllPrices().subscribe((rs)=>{
    if(rs){
      console.log(rs)
      rs.forEach(clases => {
        if(clases.typeService=="Clase"){
        this.barnPrice.push(clases)
        }
       } )
    }else {
      this.showMessage('error','Error al obtener los precios')
    }
    },
    (error) => {
      this.showMessage('error',error.error)
    });

  }

  insertUserToClass() {
    this.insertButtonDisabled = true;
    this.newClassUser = {
       userId: this.selectedUser.userId,
      classId: this.selectedClass.classId
     
    };
    this.getPrices()
    this.clasesService.insertUserToClass(this.newClassUser).subscribe((rs)=>{
      
      if(rs){ 
        this.showMessage("info","Se ha creado la clase correctamente" )
        this.insertButtonDisabled = false;
        this.showDialogAddUser = false;
        this.newPayment={
          userId:this.selectedUser.userId,
          payMethod:'Pendiente',
          payDate: this.currentDate,
          priceId:this.barnPrice[0].priceId
        }
        this.pagosService.createNewPayment(this.newPayment).subscribe((rs)=>{
          
          if(rs){
            this.showMessage("info","Se ha creado el pago para este usuario" )   
          }  else {
            this.showMessage('error','Error al intentar borrar el caballo')
          }
        }),
        (error) => {
          this.showMessage('error',error.error)
      }
      }  else {
        this.showMessage('error','Error al intentar añadir el usuario a la clase')
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    }
    )
  }

  deleteClass(classToDelete) {
    this.clasesService.deleteClassUser(classToDelete).subscribe((rs) => {
      if (rs) {
        this.getClasses();
        this.showDialog = false;
        this.showMessage('info','Usuario borrado con éxito de la clase')
      }  else {
        this.showMessage('error','Error al intentar borrar la clase')
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    }
    );
  }

  deleteClassDialog(classToDelete) {
    console.log(classToDelete);
    this.confirmationService.confirm({
      message: '¿Estás seguro/a que quieres borrar éste usuario de la clase?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteClass(classToDelete);
      }
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
        if(rs){
          this.usuarios = rs;
        this.noUsers = false;
        }else {
          this.noUsers = true;
          this.showMessage('error', 'Error al intentar acceder a la clase')
        }
      },
      (error) => {
        this.noUsers = true;
        this.showMessage('error',error.error)
      }
    );
    this.showDialog = true;
  }
  saberClaseMiercoles(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Miercoles', classHour).subscribe(
      (rs) => {
        if(rs){
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
      }
      else {
        this.noUsers = true;
        this.showMessage('error', 'Error al intentar acceder a la clase')
      }
    },
    (error) => {
      this.noUsers = true;
      this.showMessage('error',error.error)
    }
    );
    this.showDialog = true;
  }
  saberClaseJueves(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Jueves', classHour).subscribe(
      (rs) => { 
        if(rs){
        this.usuarios = rs;
        this.noUsers = false;
      }

      else {
          this.noUsers = true;
          this.showMessage('error', 'Error al intentar acceder a la clase')
        }
      },
      (error) => {
        this.noUsers = true;
        this.showMessage('error',error.error)
      }
    );
    this.showDialog = true;
  }
  saberClaseViernes(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Viernes', classHour).subscribe(
      (rs) => {
        if(rs){
        this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
        }
        else {
          this.noUsers = true;
          this.showMessage('error', 'Error al intentar acceder a la clase')
        }
      },
      (error) => {
        this.noUsers = true;
        this.showMessage('error',error.error)
      }
    );
    this.showDialog = true;
  }
  saberClaseSabado(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Sabado', classHour).subscribe(
      (rs) => {
        if(rs){
           this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
        } else {
          this.noUsers = true;
          this.showMessage('error', 'Error al intentar acceder a la clase')
        }
      },
      (error) => {
        this.noUsers = true;
        this.showMessage('error',error.error)
      }
    );
    this.showDialog = true;
  }
  saberClaseMartes(classHour: string) {
    this.usuarios = [];
    this.clasesService.getUsersByClassId('Martes', classHour).subscribe(
      (rs) => {
        if(rs){
          this.usuarios = rs;
        console.log(this.usuarios);
        this.noUsers = false;
        }else {
          this.noUsers = true;
          this.showMessage('error', 'Error al intentar acceder a la clase')
        }
      },
      (error) => {
        this.noUsers = true;
        this.showMessage('error',error.error)
      }
    );
    this.showDialog = true;
  }
}
