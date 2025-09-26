import { Component, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as screenfull from 'screenfull';

// Common imports
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// Dialog
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogSelect } from '../dialog-select/dialog-select';

// Class and Enum
import { ItemData } from '../../../../../common/class/ItemData';
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';
import { ProductionOrder } from '../../../../../common/class/ProductionOrder';
import { StopProductionType } from '../../../../../common/class/StopProductionType';
import { OrderColors_e, ProductionStatus_e, ProductionStatusColor_e } from '../../../../../common/enum/Enum';

// Components
import { ProductionControl } from "../production-control/production-control";

// JSON
import productionOrders from '../../../assets/files/production-orders.json';
import stopTypes from '../../../assets/files/stop-types.json';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NgStyle, NgIf, MatButtonModule, MatDialogModule, ProductionControl],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})

export class Terminal {
  @ViewChildren(ProductionControl) productionControl!: QueryList<ProductionControl>;

  productionOrders: ProductionOrder[] = productionOrders as ProductionOrder[];
  stopTypes: StopProductionType[] = stopTypes;

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
    const dialogRef: MatDialogRef<DialogSelect, any> = this.dialog.open(DialogSelect, {
        width: '950px',
        panelClass: 'custom-dialog',
        data: {
          dialogTitle: 'Selecionar ordem de produção',
          optionsList: this.productionOrders
        }
    });

    dialogRef.afterClosed().subscribe((newProductionOrder: ProductionOrder) => {
      if (!newProductionOrder) return;

      this.productionControl.forEach(prodControl => prodControl.resetValues());
      this.setProductionOrder(newProductionOrder);
    });
  }

  openStopDialog(): void {
    const dialogRef: MatDialogRef<DialogSelect, any> = this.dialog.open(DialogSelect, {
        width: '950px',
        panelClass: 'custom-dialog',
        data: {
          dialogTitle: 'Selecionar motivo de parada',
          optionsList: this.stopTypes
        }
    });

    dialogRef.afterClosed().subscribe((stopType: StopProductionType) => {
      if (!stopType) return;

      this.productionStatus = {
        color: ProductionStatusColor_e.Stop,
        status: ProductionStatus_e[stopType.value as keyof typeof ProductionStatus_e],
        key: stopType.key,
        time: stopType.time,
      }
    });
  }
}

