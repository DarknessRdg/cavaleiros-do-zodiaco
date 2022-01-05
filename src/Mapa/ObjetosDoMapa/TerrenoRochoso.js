import ObjetoDoMapa from "./Objeto";

class TerrenoRochoso extends ObjetoDoMapa {
    static valor_hard_code_na_matriz = '2';

    constructor(i, j) {
        super(i, j);

        this.tempo = 5;
    }
}

export default TerrenoRochoso;
