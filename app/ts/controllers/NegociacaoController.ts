class NegociacaoController{

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
    }

    adiciona(event: Event): void {
        event.preventDefault();
        const negociacao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g,',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )

        this._negociacoes.adiciona(negociacao);
        this._negociacaoView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
        console.log(this._negociacoes.paraArray())
    }

}