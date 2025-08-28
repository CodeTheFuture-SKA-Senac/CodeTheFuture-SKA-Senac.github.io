import { Component, inject } from '@angular/core';

// Common imports
import { MatButtonModule } from '@angular/material/button';

// Dialog
import { DialogProductionOrders } from '../dialog-production-orders/dialog-production-orders';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-terminal',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})

export class Terminal {
  status: string = 'Teste'
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogProductionOrders);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


