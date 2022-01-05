import ObjetoDoMapa from "./Objeto";

class TerrenoRochoso extends ObjetoDoMapa {
    static valor_hard_code_na_matriz = '2';

    constructor(i, j) {
        const tempo = 5;

        super(i, j, tempo);
    }
}

export default TerrenoRochoso;
