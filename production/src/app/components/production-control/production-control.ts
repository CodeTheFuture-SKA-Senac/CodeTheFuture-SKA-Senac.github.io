import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

// Class
import { ProductionStatus } from '../../../../../common/class/ProductionStatus';

// Enums
import { ProductionStatus_e, ProductionStatusColor_e } from '../../../../../common/enum/Enum';

@Component({
  selector: 'app-production-control',
  imports: [NgStyle],
  templateUrl: './production-control.html',
  styleUrl: './production-control.scss'
})

export class ProductionControl {
  @Input() title: string | undefined;
  @Input() icon: string | undefined;

  @Input() productionOrderQuantity: number | any;
  @Input() productionStatus: ProductionStatus | any;
  @Input() productionOrderKey: string | any;

  value: number = 0;
  valuePercentage: number = 0;

  ProductionStatus_e: typeof ProductionStatus_e = ProductionStatus_e;
  ProductionStatusColor_e: typeof ProductionStatusColor_e = ProductionStatusColor_e;

  constructor() {}

  getChartColor(): string {
    if ((this.productionOrderQuantity - this.value) || !this.productionOrderKey)
      return 'var(--color-dark-blue-800)';

    return (this.title === 'Produzido') ?  'var(--color-green)' : 'var(--color-red)';
  }

  changePercentageValue(isIncrease: boolean = true): void {
    this.value = this.getValue(isIncrease);
    this.valuePercentage = Math.round((this.value / this.productionOrderQuantity) * 100);
  }

  getValue(isIncrease: boolean): number {
    if (isIncrease)
      return (this.value >= this.productionOrderQuantity) ? this.value : ++this.value;
    else
      return (this.value === 0) ? this.value : --this.value;
  }

  resetPercentageValues(): void {
    this.value = 0;
    this.valuePercentage = 0;
  }
}
