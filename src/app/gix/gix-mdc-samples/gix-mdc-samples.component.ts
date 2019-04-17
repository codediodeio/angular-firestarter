import { Component, OnInit } from '@angular/core';

import { NotifyService } from 'src/app/core/notify.service';


import {MatDialog, MatDialogConfig} from '@angular/material';
import { GixDialogSampleComponent } from '../gix-dialog-sample/gix-dialog-sample.component';

@Component({
  selector: 'gix-mdc-samples',
  templateUrl: './gix-mdc-samples.component.html',
  styleUrls: ['./gix-mdc-samples.component.scss'],
  providers: [NotifyService]
})
export class GixMdcSamplesComponent implements OnInit {


  constructor(public notifyService: NotifyService,public dialog: MatDialog) { }


  openDialog() {

    
    const dialogRef = this.dialog.open(GixDialogSampleComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
  }


  showNotification(msg:string)
  {
    this.notifyService.update(msg,'info');
  }


  //@feature Toasting Service

  showSuccess() {
    this.notifyService.add({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
  }

  showInfo() {
    this.notifyService.add({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }

  showWarn() {
    this.notifyService.add({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes'
  ,sticky:false });
  }

  showWarnSticky() {
    this.notifyService.add({ severity: 'warn', summary: 'Stick a Warn Message', detail: 'This Message stick !!'
  ,sticky:true });
  }
  showError() {
    this.notifyService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed',life:1000 });
  }

  showCustom() {
    this.notifyService.add({ key: 'custom', severity: 'info', summary: 'Custom Toast', detail: 'With a Gradient' });
  }

  showTopLeft() {
    this.notifyService.add({ key: 'tl', severity: 'info', summary: 'Success Message', detail: 'Order submitted' });
  }

  showTopCenter() {
    this.notifyService.add({ key: 'tc', severity: 'warn', summary: 'Info Message', detail: 'PrimeNG rocks' });
  }

  showConfirm() {
    this.notifyService.clearToast();
    this.notifyService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }


}
