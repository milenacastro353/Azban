export class Empleados{
    nombre: string= '';
    horasTrabajadas: number = 0;
    valorAPagar: number = 0 ;
    
    calcularTotalAPagar(precioHora : number){
        this.valorAPagar = precioHora * this.horasTrabajadas;
    }
}