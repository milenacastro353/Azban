export class Vendedor{
    nombre: string= "";
    sueldo: number= 0 ;
    precioAutoVendido : Array <number>= []; 
    

    salarioTotal(salarioMinimo: number, adicionalAuto:number){
        let totalAutoVendido = 0;
        
        this.precioAutoVendido.forEach((precio)=>{
            totalAutoVendido += precio
            
        })
        console.log(this.nombre + " total vendido: " + totalAutoVendido)

        let adicionalPorcentaje =((totalAutoVendido * 2)/ 100)
        this.sueldo = salarioMinimo + adicionalAuto + adicionalPorcentaje
        console.log("mostrar suedo "+ this.sueldo);
    }

}