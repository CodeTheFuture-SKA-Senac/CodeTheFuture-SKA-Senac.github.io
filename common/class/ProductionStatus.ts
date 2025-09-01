import { ProductionStatus_e, ProductionStatusColor_e } from '../enum/Enum';

export class ProductionStatus {
    status: ProductionStatus_e;
    color: ProductionStatusColor_e;
    key?: string;
    time?: number | null;

    constructor(status?: ProductionStatus_e, color?: ProductionStatusColor_e, key?: string, time?: number) {
        this.status = status ?? ProductionStatus_e.WaitingProduction;
        this.color = color ?? ProductionStatusColor_e.WaitingProduction;
        this.key = key ?? '';
        this.time = time ?? null;
    }
}
