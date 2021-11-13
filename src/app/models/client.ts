export class Client {
    idClient: number;
    name: string;
    idDocumentType: number;
    document: string;
    idDepartment: number;
    city: string;
    idPaymentMethod: number;
    paid: boolean;
    initialPay: boolean;
    money: number;
    email: string;
    phone: string;
    address:string;
    contactId: number;
    contactType: string;
    contactName: string;

    constructor(){
        this.idClient = 0;
        this.name = '';
        this.idDocumentType = 0;
        this.document = '';
        this.idDepartment = 0;
        this.city = '';
        this.idPaymentMethod = 0;
        this.paid = true;
        this.initialPay = false;
        this.money = 0;
        this.email = '';
        this.phone = '';
        this.address = '';
        this.contactId = 0;
        this.contactType = '';
        this.contactName = '';
    }

}