
import { Negociacoes } from "../models/Negociacoes";
import { NegociacaoView } from "../views/NegociacaoView";
import { MensagemView } from "../views/MensagemView";
import { Negociacao } from "../models/Negociacao";
import { domInject, throttle } from "../helpers/decorators/index"
import { NegociacaoParcial } from "../models/NegociacaoParcial";
import {NegociacaoService } from "../services/index";
import { HandlerFunction } from "../services/NegociacaoService";
enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}

let timer = 0;
export class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacaoView = new NegociacaoView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacaoView.update(this._negociacoes);
        let nome: string = '';

    }
    _ehDiaUtil(data: Date) {
        return !(data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo)

    }
    @throttle(500)
    importa() {
        const isOk: HandlerFunction = (res: Response)=> {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res;
        }
        this._negociacaoService.obterNegociacoes(isOk).then(negociacoes=>{
            negociacoes.forEach(n=>this._negociacoes.adiciona(n))
            this._negociacaoView.update(this._negociacoes);
        })






    }

    adiciona(event: Event): void {
        event.preventDefault();
        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if (!this._ehDiaUtil(data)) {
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