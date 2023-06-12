import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoadingHorseComponent } from '../loading-horse/loading-horse.component';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  loadingModal;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  showLoading() {
    this.loadingModal = this.dialogService.open(LoadingHorseComponent, {
      showHeader: false,
      closable: false,
      closeOnEscape: false,
      styleClass: 'loading',
      width: '90%',
      height: '90%',
    });
  }

  closeLoading() {
    if (this.loadingModal) {
      try {
        this.loadingModal.close();
        this.loadingModal = undefined;
      } catch {}
    }
  }

  showMessage(severity, detail) {
    let summary;
    console.log(severity);
    if (severity === 'error') {
      summary = '¡Ups! Algo no ha ido bien';
    }
    if (severity === 'info') {
      summary = '¡Genial!';
    }
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
