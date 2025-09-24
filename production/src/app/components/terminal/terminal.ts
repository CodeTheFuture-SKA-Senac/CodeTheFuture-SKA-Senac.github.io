import { Component, inject } from '@angular/core';
import * as screenfull from 'screenfull';

// Common imports
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// Dialog
import { DialogProductionOrders } from '../dialog-production-orders/dialog-production-orders';
import { DialogStopProduction } from '../dialog-stop-production/dialog-stop-production';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// Class and Enum
import { ItemData } from '../../../../../common/class/ItemData';
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';
import { ProductionOrder } from '../../../../../common/class/ProductionOrder';
import { OrderColors_e, ProductionStatus_e, ProductionStatusColor_e } from '../../../../../common/enum/Enum';

// Components
import { ProductionControl } from "../production-control/production-control";

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NgStyle, NgIf, MatButtonModule, MatDialogModule, ProductionControl],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})

export class Terminal {
  itemData: ItemData = new ItemData();
  productionStatus: ProductionStatus = new ProductionStatus();
  productionOrder: ProductionOrder = new ProductionOrder();

  ProductionStatus_e: typeof ProductionStatus_e = ProductionStatus_e;
  ProductionStatusColor_e: typeof ProductionStatusColor_e = ProductionStatusColor_e;
  OrderColors_e: typeof OrderColors_e = OrderColors_e;

  color: string = '';

  disabledStyle: any = {};
  
  readonly dialog: MatDialog = inject(MatDialog);

  fullscreen(): void {
    if (screenfull.default.isEnabled)
      screenfull.default.toggle();
  }

  setProductionOrder(newProductionOrder: ProductionOrder): void {
     this.productionStatus = new ProductionStatus(ProductionStatus_e.InProduction, ProductionStatusColor_e.InProduction);

      if (newProductionOrder.key === this.productionOrder.key)
        return;

      // this.resetPercentageValues();
      this.productionOrder = newProductionOrder;
      this.disabledStyle = {'opacity': !this.productionOrder.key || (this.productionStatus.color === ProductionStatusColor_e.Stop)  ? '0.5' : '1'}
  }

  // Open dialogs
  openProductionDialog(): void {
    const dialogRef: MatDialogRef<DialogProductionOrders, any> = this.dialog.open(DialogProductionOrders, {
        width: '950px',
        panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((newProductionOrder: ProductionOrder) => {
      if (!newProductionOrder) return;

      this.setProductionOrder(newProductionOrder);
    });
  }

  openStopDialog(): void {
    const dialogRef = this.dialog.open(DialogStopProduction, {
        width: '950px',
        panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((result: ProductionStatus) => {
      if (!result) return;

      this.productionStatus = result;
    });
  }
}


