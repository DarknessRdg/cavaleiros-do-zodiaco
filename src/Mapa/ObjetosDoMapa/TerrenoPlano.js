import ObjetoDoMapa from "./Objeto";

class TerrenoPlano extends ObjetoDoMapa {
    static valor_hard_code_na_matriz = '1';

    constructor(i, j) {
        super(i, j);

        this.tempo = 1;
    }
}

export default TerrenoPlano;
