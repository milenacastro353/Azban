export class ProductsOrder{
    id: number;
    colorId: number;
    sizeId: number;
    mainPrint: string;
    secundaryPrint: string;
    observations: string;
    quantity: number;
    price: number;
    priceVaration: number;

    constructor(){
        this.id = 0;
        this.colorId = 0;
        this.sizeId = 0;
        this.mainPrint = '';
        this.secundaryPrint = '';
        this.observations = '';
        this.quantity = 0;
        this.price = 0;
        this.priceVaration = 0;
    }
}
