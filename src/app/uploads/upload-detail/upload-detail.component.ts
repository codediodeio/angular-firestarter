import { Component, Input } from '@angular/core';

import { UploadService } from '../shared/upload.service';

import { Upload } from '../shared/upload';

@Component({
  selector: 'upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss'],
})
export class UploadDetailComponent {

  @Input() upload: Upload;

  constructor(private upSvc: UploadService) { }

  deleteUpload() {
    this.upSvc.deleteUpload(this.upload);
  }
}
