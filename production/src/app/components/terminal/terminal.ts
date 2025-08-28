import { Component, inject } from '@angular/core';

// Common imports
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

// Dialog
import { DialogProductionOrders } from '../dialog-production-orders/dialog-production-orders';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

// Class
import { ItemData } from '../../../../../common/class/ItemData';
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [NgStyle, MatButtonModule, MatDialogModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})

export class Terminal {
  itemData: ItemData = new ItemData();
  productionStatus: ProductionStatus = new ProductionStatus();

  productionOrder: any = {};
  
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogProductionOrders, {
        width: '950px',
        panelClass: 'my-custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.productionOrder = JSON.parse(JSON.stringify(result));
    });
  }
}


