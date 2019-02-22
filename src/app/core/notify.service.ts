import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material';
import { Observable } from 'rxjs';

/// Notify users about errors and other helpful stuff
@Injectable()
export class NotifyService {

  constructor(private snackBar: MatSnackBar) {}

  update(message: string, panelClass: 'error' | 'info' | 'success'): Observable<MatSnackBarDismiss> {
    return this.snackBar.open(message, 'OK', { panelClass }).afterDismissed();
  }
}
