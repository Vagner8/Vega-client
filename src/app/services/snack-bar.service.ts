import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(
    private sb: MatSnackBar,
    private ss: StateService,
  ) {}

  error() {
    this.open('error-snack-bar', this.ss.error());
  }

  success() {
    this.open('success-snack-bar', 'Good to go!', 2000);
  }

  private open(className: string, message: string | null, duration: number = 5000) {
    this.sb.open(message || 'No massage', 'Close', {
      duration,
      panelClass: ['snack-bar', className],
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
