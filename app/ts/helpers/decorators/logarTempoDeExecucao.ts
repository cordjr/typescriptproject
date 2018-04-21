
export function logarTempoDeExecucao(){
    return function(target: any, proertKey: string, descriptor: PropertyDescriptor){
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[] ){
            
            console.log('------------------------------------------');
            console.log(`parametros passados para o metodo ${proertKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`O retorno do metodo ${proertKey}: ${retorno}`);
            console.log(` O tempo de execução metodo ${proertKey} foi ${t2-t1} ms`);
            return retorno;
        }
        return descriptor;
    }
}