import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;

  constructor(private upSvc: UploadService) { }

  ngOnInit() {
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  upload() {
    let file = this.selectedFiles.item(0)
    this.upSvc.singleUpload(file)
  }

  uploadMulti() {
    let files = this.selectedFiles
    this.upSvc.multiUpload(files);
  }



}
