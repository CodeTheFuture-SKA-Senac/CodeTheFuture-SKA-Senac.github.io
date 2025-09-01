import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

// Common imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-production-information',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-production-information.html',
  styleUrl: './dialog-production-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogProductionInformation {
  constructor(
    public dialogRef: MatDialogRef<DialogProductionInformation>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
