import { Negociacao } from "../models/Negociacao";
import { Imprimivel } from "../models/Imprimivel";

export function imprime(...negociacoes: Imprimivel[]){
    negociacoes.forEach(n=>n.paraTexto());
}