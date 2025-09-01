import { Component, inject } from '@angular/core';
import * as screenfull from 'screenfull';

// Common imports
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// Dialog
import { DialogProductionOrders } from '../dialog-production-orders/dialog-production-orders';
import { DialogStopProduction } from '../dialog-stop-production/dialog-stop-production';
import { DialogProductionInformation } from '../dialog-production-information/dialog-production-information';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

// Class and Enum
import { ItemData } from '../../../../../common/class/ItemData';
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';
import { ProductionOrder } from '../../../../../common/class/ProductionOrder';
import { OrderColors_e, ProductionStatus_e, ProductionStatusColor_e } from '../../../../../common/enum/Enum';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NgStyle, NgIf, MatButtonModule, MatDialogModule],
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

  produced: number = 0;
  rejected: number = 0;

  producedPercentage: number = 0;
  rejectedPercentage: number = 0;

  totalProduced: number = 0;
  totalRejected: number = 0;

  color: string = ''

  timeLeft: number = 0;
  timerFormatted: any;
  private intervalId: any;
  
  readonly dialog: MatDialog = inject(MatDialog);
  
  changePercentageValue(isIncrease: boolean = true, isProduced: boolean = true): void {
    if (isProduced) {
      this.produced = this.getValue(this.produced, isIncrease, isProduced);
      this.producedPercentage = this.setPercentage(this.produced);
    }
    else {
      this.rejected = this.getValue(this.rejected, isIncrease, isProduced);
      this.rejectedPercentage = this.setPercentage(this.rejected);
    }
  }

  getValue(value: number, isIncrease: boolean, isProduced: boolean = true): number {
    if (isIncrease) {
      if (value >= this.productionOrder.quantity) 
        return value;

      (isProduced) ? ++this.totalProduced : ++this.totalRejected;
      
      return ++value
    }

    if (value === 0) 
      return value;
    
    (isProduced) ? --this.totalProduced : --this.totalRejected;
    return --value;
  }

  setPercentage(value: number): number {
    return Math.round((value / this.productionOrder.quantity) * 100);
  }

  resetPercentageValues(): void {
    this.produced = 0;
    this.rejected = 0;

    this.producedPercentage = 0;
    this.rejectedPercentage = 0;
  }

  // Open dialogs
  openProductionDialog(): void {
    const dialogRef: MatDialogRef<DialogProductionOrders, any> = this.dialog.open(DialogProductionOrders, {
        width: '950px',
        panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((newProductionOrder: ProductionOrder) => {
      if (!newProductionOrder) return;

      this.productionStatus = new ProductionStatus(ProductionStatus_e.InProduction, ProductionStatusColor_e.InProduction);

      if (newProductionOrder.key === this.productionOrder.key) return;

      this.resetPercentageValues();
      this.productionOrder = newProductionOrder;
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

      this.timerFormatted = null;
      clearInterval(this.intervalId);
      if (result?.time) this.startTimer(result.time);
    });
  }

  openInformationDialog(): void {
    const dialogRef = this.dialog.open(DialogProductionInformation, {
        width: '950px',
        panelClass: 'custom-dialog',
        data: {totalProduced: this.totalProduced, totalRejected: this.totalRejected}
    });

    dialogRef.afterClosed().subscribe((result: ProductionStatus) => {
    });
  }

  fullscreen(): void {
    if (screenfull.default.isEnabled)
      screenfull.default.toggle();
  }

  startTimer(minutes: number): void {
    this.timeLeft = minutes * 60;
    this.updateDisplay();

    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
      } else {
        this.timerFormatted = null;
      }
    }, 1000);
  }

  private updateDisplay(): void {
    const m: number = Math.floor(this.timeLeft / 60);
    const s: number = this.timeLeft % 60;
    this.timerFormatted = `${m}:${s < 10 ? '0' : ''}${s}`;
  }
}


