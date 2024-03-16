import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-diaglog',
  standalone: true,
  imports: [],
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>Are you sure you want to delete this project?</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </div>
  `,
  templateUrl: './confirmation-diaglog.component.html',
  styleUrl: './confirmation-diaglog.component.css'
})
export class ConfirmationDiaglogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDiaglogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


    onConfirm(): void {
      this.dialogRef.close(true); // Close dialog with true result (user confirmed)
    }
  
    onCancel(): void {
      this.dialogRef.close(false); // Close dialog with false result (user canceled)
    }
}
