import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-select',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-select.html',
  styleUrl: './dialog-select.scss'
})

export class DialogSelect {
  dialogTitle: string = '';
  optionsList: any = null;

  selectedOption: any = null;

  constructor(public dialogRef: MatDialogRef<DialogSelect>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogTitle = data.dialogTitle;
    this.optionsList = data.optionsList;
  }

  setSelectedOption(event: any): void {
    this.selectedOption = event;
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedOption);
  }
}
