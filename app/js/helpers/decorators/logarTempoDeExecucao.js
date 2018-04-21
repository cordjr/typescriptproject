System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao() {
        return function (target, proertKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                console.log('------------------------------------------');
                console.log(`parametros passados para o metodo ${proertKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(`O retorno do metodo ${proertKey}: ${retorno}`);
                console.log(` O tempo de execução metodo ${proertKey} foi ${t2 - t1} ms`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
