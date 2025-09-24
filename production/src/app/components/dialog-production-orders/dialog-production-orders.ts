import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// Production Orders
import { ProductionOrder } from '../../../../../common/class/ProductionOrder';
import productionOrders from '../../../assets/files/production-orders.json';

@Component({
  selector: 'app-dialog-production-orders',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-production-orders.html',
  styleUrl: './dialog-production-orders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogProductionOrders {
  productionOrders: any[] = productionOrders;
  selectedOrder: ProductionOrder | null = null;

  constructor(
    public dialogRef: MatDialogRef<DialogProductionOrders>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  setSelectedOrder(event: any): void {
    this.selectedOrder = event;
  }

  closeDialog(): void {
    this.dialogRef.close(this.selectedOrder);
  }
}
