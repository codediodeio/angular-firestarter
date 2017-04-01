import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from "angularfire2";
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

@Component({
  selector: 'uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss']
})
export class UploadsListComponent implements OnInit {

  uploads: FirebaseListObservable<Upload[]>;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
    this.uploads = this.upSvc.getUploads()
  }


}
