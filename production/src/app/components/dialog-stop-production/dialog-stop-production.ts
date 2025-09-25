import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

// Common imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StopProductionType } from '../../../../../common/class/StopProductionType'
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';
import { ProductionStatus_e, ProductionStatusColor_e } from '../../../../../common/enum/Enum';

import stopTypes from '../../../assets/files/production-stop-types.json';

@Component({
  selector: 'app-dialog-stop-production',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-stop-production.html',
  styleUrl: './dialog-stop-production.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogStopProduction {
  stopTypes: StopProductionType[] = stopTypes;

  constructor(
    public dialogRef: MatDialogRef<DialogStopProduction>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectedStopType: ProductionStatus | null = null;

  setSelectedOrder(event: StopProductionType): void {
    this.selectedStopType = {
      color: ProductionStatusColor_e.Stop,
      status: ProductionStatus_e[event.value as keyof typeof ProductionStatus_e],
      key: event.key,
      time: event.time,
    }
  }
  
  closeDialog() {
    this.dialogRef.close(this.selectedStopType);
  }
}
