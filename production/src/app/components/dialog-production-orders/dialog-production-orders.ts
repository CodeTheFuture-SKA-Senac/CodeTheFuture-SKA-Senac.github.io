import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

// Common imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-production-orders',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-production-orders.html',
  styleUrl: './dialog-production-orders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogProductionOrders {
  productionOrders: any = [{
      label: '123 - Barco de papel',
      value: '123 - Barco de papel',
      key: '123',
      icon: 'TbSailboat',
      image: 'TbSailboat',
      description: 'Quantidade: 5; Cor: Azul.',
      productImage: 'https://media-public.canva.com/p19os/MAFtnBp19os/1/tl.png'
    },
    {
      label: '456 - Barco de papel',
      value: '456 - Barco de papel',
      key: '456',
      icon: 'TbSailboat',
      image: 'TbSailboat',
      description: 'Quantidade: 8; Cor: Verde.',
      productImage: 'https://media-public.canva.com/p19os/MAFtnBp19os/1/tl.png'
    },
    {
      label: '789 - Barco de papel',
      value: '789 - Barco de papel',
      key: '789',
      icon: 'TbSailboat',
      image: 'TbSailboat',
      description: 'Quantidade: 10; Cor: Vermelho.',
      productImage: 'https://media-public.canva.com/p19os/MAFtnBp19os/1/tl.png'
    },
    {
      label: '1011 - Barco de papel',
      value: '1011 - Barco de papel',
      key: '1011',
      icon: 'TbSailboat',
      image: 'TbSailboat',
      description: 'Quantidade: 2; Cor: Amarelo.',
      productImage: 'https://media-public.canva.com/p19os/MAFtnBp19os/1/tl.png'
    },
    {
      label: '1012 - Avião de papel',
      value: '1012 - Avião de papel',
      key: '1012',
      icon: 'TbPlane',
      image: 'TbPlane',
      description: 'Quantidade: 7; Cor: Azul.',
      productImage: 'https://media-public.canva.com/j9FTw/MAE1Scj9FTw/1/tl.png'
    },
    {
      label: '987 - Avião de papel',
      value: '987 - Avião de papel',
      key: '987',
      icon: 'TbPlane',
      image: 'TbPlane',
      description: 'Quantidade: 5; Cor: Verde.',
      productImage: 'https://media-public.canva.com/j9FTw/MAE1Scj9FTw/1/tl.png'
    },
    {
      label: '654 - Avião de papel',
      value: '654 - Avião de papel',
      key: '654',
      icon: 'TbPlane',
      image: 'TbPlane',
      description: 'Quantidade: 6; Cor: Vermelho.',
      productImage: 'https://media-public.canva.com/j9FTw/MAE1Scj9FTw/1/tl.png'
    },
    {
      label: '321 - Avião de papel',
      value: '321 - Avião de papel',
      key: '321',
      icon: 'TbPlane',
      image: 'TbPlane',
      description: 'Quantidade: 7; Cor: Amarelo.',
      productImage: 'https://media-public.canva.com/j9FTw/MAE1Scj9FTw/1/tl.png'
    }
   ];

  constructor(
    public dialogRef: MatDialogRef<DialogProductionOrders>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  selectedOrder: any = {};

  setSelectedOrder(event: any): void {
    console.log(event)
    this.selectedOrder = event;
  }
  
  closeDialog() {
    this.dialogRef.close(this.selectedOrder);
  }
}
