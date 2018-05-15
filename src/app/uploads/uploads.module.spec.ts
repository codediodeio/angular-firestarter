import { UploadsModule } from './uploads.module';

describe('UploadsModule', () => {
  let uploadsModule: UploadsModule;

  beforeEach(() => {
    uploadsModule = new UploadsModule();
  });

  it('should create an instance', () => {
    expect(uploadsModule).toBeTruthy();
  });
});
