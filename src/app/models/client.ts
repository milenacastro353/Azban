import { Address } from "./address";

export class Client {
    id: number;
    idDocumentType: number;
    document: string;
    name: string;
    phone: string;
    email: string;
    idContactType: number;
    contactValue: string;   
    idPaymentMethod: number;
    paid: boolean;
    initialPay: boolean;
    deposit: number;
    address: Array<Address>;

    constructor(){
        this.id = 0;
        this.name = '';
        this.idDocumentType = 0;
        this.document = '';
        this.idPaymentMethod = 0;
        this.paid = true;
        this.initialPay = false;
        this.email = '';
        this.phone = '';
        this.idContactType = 0;
        this.contactValue = '';
        this.deposit = 0;
        this.address = [];
    }

}