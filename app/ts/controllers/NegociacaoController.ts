
import { Negociacoes } from "../models/Negociacoes";
import { NegociacaoView } from "../views/NegociacaoView";
import { MensagemView } from "../views/MensagemView";
import { Negociacao } from "../models/Negociacao";
import { domInject } from "../helpers/decorators/index"
import { NegociacaoParcial } from "../models/NegociacaoParcial";
enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
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

    constructor() {
        this._negociacaoView.update(this._negociacoes);
        let nome: string = '';

    }
    _ehDiaUtil(data: Date) {
        return !(data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo)

    }

    importa() {
        function isOk(res: Response) {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res;
        }
        fetch('http://localhost:8080/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => {
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)
                )
                .forEach(n => this._negociacoes.adiciona(n))
                this._negociacaoView.update(this._negociacoes);
            })
            .catch(err => console.log(err));
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