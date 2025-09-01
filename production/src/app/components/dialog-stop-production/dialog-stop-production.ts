import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

// Common imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { StopProductionType } from '../../../../../common/class/StopProductionType'
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';
import { ProductionStatus_e, ProductionStatusColor_e } from '../../../../../common/enum/Enum';

@Component({
  selector: 'app-dialog-stop-production',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog-stop-production.html',
  styleUrl: './dialog-stop-production.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogStopProduction {
  stopTypes: StopProductionType[] = [{
      label: 'Parada - Almoço',
      value: 'LunchStop',
      key: '1',
      icon: 'TbApple',
      image: 'TbApple',
      time: 3,
      description: 'Tempo de parada: 3 min'
    },
    {
      label: 'Parada - Treinamento do time',
      value: 'TrainingStop',
      key: '2',
      icon: 'TbMoodBoy',
      image: 'TbMoodBoy',
      time: 2,
      description: 'Tempo de parada: 2 min'
    },
    {
      label: 'Parada - Queda de energia',
      value: 'PowerOutageStop',
      key: '3',
      icon: 'TbLampOff',
      image: 'TbLampOff',
      time: 1,
      description: 'Tempo de parada: 1 min'
    },
    {
      label: 'Parada - Troca de operador',
      value: 'OperatorChangeStop',
      key: '4',
      icon: 'TbStatusChange',
      image: 'TbStatusChange',
      time: null,
      description: 'Rotação de setor'
    },
    {
      label: 'Parada - Manutenção',
      value: 'MaintenanceStop',
      key: '5',
      icon: 'TbTool',
      image: 'TbTool',
      time: null,
      description: 'Resolva o desafio'
    } 
  ];

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
