System.register(["../models/Negociacoes", "../views/NegociacaoView", "../views/MensagemView", "../models/Negociacao", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var Negociacoes_1, NegociacaoView_1, MensagemView_1, Negociacao_1, index_1, DiaDaSemana, NegociacaoController;
    return {
        setters: [
            function (Negociacoes_1_1) {
                Negociacoes_1 = Negociacoes_1_1;
            },
            function (NegociacaoView_1_1) {
                NegociacaoView_1 = NegociacaoView_1_1;
            },
            function (MensagemView_1_1) {
                MensagemView_1 = MensagemView_1_1;
            },
            function (Negociacao_1_1) {
                Negociacao_1 = Negociacao_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["Domingo"] = 0] = "Domingo";
                DiaDaSemana[DiaDaSemana["Segunda"] = 1] = "Segunda";
                DiaDaSemana[DiaDaSemana["Terca"] = 2] = "Terca";
                DiaDaSemana[DiaDaSemana["Quarta"] = 3] = "Quarta";
                DiaDaSemana[DiaDaSemana["Quinta"] = 4] = "Quinta";
                DiaDaSemana[DiaDaSemana["Sexta"] = 5] = "Sexta";
                DiaDaSemana[DiaDaSemana["Sabado"] = 6] = "Sabado";
            })(DiaDaSemana || (DiaDaSemana = {}));
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new Negociacoes_1.Negociacoes();
                    this._negociacaoView = new NegociacaoView_1.NegociacaoView('#negociacoesView');
                    this._mensagemView = new MensagemView_1.MensagemView('#mensagemView');
                    this._negociacaoView.update(this._negociacoes);
                    let nome = '';
                }
                _ehDiaUtil(data) {
                    return !(data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo);
                }
                importa() {
                    function isOk(res) {
                        if (!res.ok) {
                            throw new Error(res.statusText);
                        }
                        return res;
                    }
                    fetch('http://localhost:8080/dados')
                        .then(res => isOk(res))
                        .then(res => res.json())
                        .then((dados) => {
                        dados.map(dado => new Negociacao_1.Negociacao(new Date(), dado.vezes, dado.montante))
                            .forEach(n => this._negociacoes.adiciona(n));
                        this._negociacaoView.update(this._negociacoes);
                    })
                        .catch(err => console.log(err));
                }
                adiciona(event) {
                    event.preventDefault();
                    let data = new Date(this._inputData.val().replace(/-/g, ','));
                    if (!this._ehDiaUtil(data)) {
                        this._mensagemView.update('Somente negociacões em dias uteis serão consideradas');
                        return;
                    }
                    const negociacao = new Negociacao_1.Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));
                    this._negociacoes.adiciona(negociacao);
                    this._negociacaoView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso!');
                    console.log(this._negociacoes.paraArray());
                }
            };
            __decorate([
                index_1.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_1.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_1.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
