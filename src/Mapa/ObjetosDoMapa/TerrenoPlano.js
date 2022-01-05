import ObjetoDoMapa from "./Objeto";

class TerrenoPlano extends ObjetoDoMapa {
    static valor_hard_code_na_matriz = '1';

    constructor(i, j) {
        const tempo = 1;

        super(i, j, tempo);
    }
}

export default TerrenoPlano;
