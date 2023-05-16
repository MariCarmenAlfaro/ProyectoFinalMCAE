import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  commentType: string = 'Contacto';
  comment: any;
  clubId: string = null;
  mnjConfirm: boolean = false;
  // TODO meter los required y validaciones
  profileForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    emailUser: new FormControl('', Validators.required),
    peticion: new FormControl('', Validators.required),
  });

  constructor(public contactService: ContactService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.comment = {
      commentType: this.commentType,

      userName: this.profileForm.value.userName,

      emailUser: this.profileForm.value.emailUser,
      peticion: this.profileForm.value.peticion,
      clubId: this.clubId,
    };
    console.log(this.comment);
    this.contactService.insertSuggestions(this.comment).subscribe((rs) => {
      rs;
      console.log(rs);
      if (rs == true) {
        this.mnjConfirm = true;
      }
    });
  }
}
