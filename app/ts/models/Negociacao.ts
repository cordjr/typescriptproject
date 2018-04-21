import { Imprimivel } from "./Imprimivel";
import { Igualavel } from "./Igualavel";

export class Negociacao implements Imprimivel, Igualavel<Negociacao> {
    ehIgual(param: Negociacao): boolean {
        return (this.data.getDate() == param.data.getDate()
                && this.data.getMonth() == param.data.getMonth()
                && this.data.getFullYear() == param.data.getFullYear()
                && this.quantidade == param.quantidade
                && this.valor == this.valor)
    }
    
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {
    
    }

    
    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto(): void{
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }

}