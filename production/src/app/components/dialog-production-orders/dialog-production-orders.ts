import { ChangeDetectionStrategy, Component } from '@angular/core';

// Common imports
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-production-orders',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-production-orders.html',
  styleUrl: './dialog-production-orders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogProductionOrders {

}
