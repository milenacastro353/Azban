export class Color {
    id: number;
    color: string;
    index: string;

    constructor(){
        this.id = 0;
        this.color = '';
        this.index = '';
    }

    mapClassBgColor(){
        return 'bg-azban-' + this.index;
    }

}