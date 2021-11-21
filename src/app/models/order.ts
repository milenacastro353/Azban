import { ProductsOrder } from "./products-to-order";

export class Order {
    id: number;
    clientId: number;
    paymentMethodId: number;
    addressId: number;
    discount: number;
    totalPrice: number;
    deposit: number;
    deposited: boolean;
    paidOut: boolean;
    products: Array<ProductsOrder>;

    constructor(){
        this.id = 0;
        this.clientId = 0;
        this.paymentMethodId = 0;
        this.addressId = 0;
        this.discount = 0;
        this.totalPrice = 0;
        this.deposit = 0;
        this.deposited = true;
        this.paidOut = true;
        this.products = [];
    }
}

