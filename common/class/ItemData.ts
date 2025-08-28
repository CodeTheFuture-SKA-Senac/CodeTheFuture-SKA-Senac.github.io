export class ItemData {
    item: string;
    quantity: number;
    color: string;
    image: string;

    constructor(item?: string, quantity?: number, color?: string, image?: string) {
        this.item = item ?? '';
        this.quantity = quantity ?? 0;
        this.color = color ?? '';
        this.image = image ?? '';
    }
}
