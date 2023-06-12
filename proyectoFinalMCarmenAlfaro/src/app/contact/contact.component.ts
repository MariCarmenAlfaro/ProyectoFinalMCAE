import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { CommonComponent } from '../common/common.component';
import { SugerenciasService } from '../sugerencias-reservas/sugerencias.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends CommonComponent implements OnInit {
  commentType: string = 'Contacto';
  comment: any;
  clubId: string = null;
  mnjConfirm: boolean = false;
  profileForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    emailUser: new FormControl('', Validators.required),
    peticion: new FormControl('', Validators.required),
  });

  constructor(public contactService: ContactService,
    public sugerenciaService: SugerenciasService,
    protected injector: Injector){
      super(injector)
  }

  ngOnInit(): void {}

  onSubmit() {
    this.comment = {
      commentType: this.commentType,
      userName: this.profileForm.value.userName,
      emailUser: this.profileForm.value.emailUser,
      peticion: this.profileForm.value.peticion,
      clubId: this.clubId,
    };
    this.sugerenciaService.insertSuggestions(this.comment).subscribe((rs) => {
      if (rs) {
        this.mnjConfirm = true;
      }else{
        this.showMessage('error', 'Error al intentar crear el usuario');
      }
    },
    (error) => {
      this.showMessage('error',error.error)
    });
  }
}
