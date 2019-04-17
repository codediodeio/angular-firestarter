import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material';

@Component({
  selector: 'gix-dialog-sample',
  templateUrl: './gix-dialog-sample.component.html',
  styleUrls: ['./gix-dialog-sample.component.scss']
})
export class GixDialogSampleComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
