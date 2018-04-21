System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacoes;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                ehIgual(param) {
                    return JSON.stringify(this._negociacoes) == JSON.stringify(param.paraArray());
                }
                adiciona(negociacao) {
                    if (this._negociacoes.some(n => n.ehIgual(negociacao))) {
                        return;
                    }
                    this._negociacoes.push(negociacao);
                }
                paraArray() {
                    return [].concat(this._negociacoes);
                }
                paraTexto() {
                    console.log(JSON.stringify(this._negociacoes));
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
