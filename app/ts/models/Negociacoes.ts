import { Negociacao } from "./Negociacao";
import { Imprimivel } from "./Imprimivel";
import { Igualavel } from "./Igualavel";

export class Negociacoes implements Imprimivel, Igualavel<Negociacoes>{
    ehIgual(param: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(param.paraArray());
    }
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao){
        if (this._negociacoes.some(n=> n.ehIgual(negociacao))){
            return;
        }
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        return   ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void{
        console.log(JSON.stringify(this._negociacoes));
    }
}