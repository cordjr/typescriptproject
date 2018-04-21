
import { Negociacoes } from "../models/Negociacoes";
import { NegociacaoView } from "../views/NegociacaoView";
import { MensagemView } from "../views/MensagemView";
import { Negociacao } from "../models/Negociacao";
enum DiaDaSemana{
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
export class NegociacaoController{

    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacaoView = new NegociacaoView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this._inputData = $('#data');
        this._inputQuantidade =  $('#quantidade');
        this._inputValor =  $('#valor');
        this._negociacaoView.update(this._negociacoes);
        let nome: string = '';
        
    }
    _ehDiaUtil(data: Date){
        return !(data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo)

    }

    adiciona(event: Event): void {
        event.preventDefault();
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this._ehDiaUtil(data)){
            this._mensagemView.update('Somente negociacões em dias uteis serão consideradas');
            return;
        }
        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        )

        this._negociacoes.adiciona(negociacao);
        this._negociacaoView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
        console.log(this._negociacoes.paraArray())
    }

}