import ObjetoDoMapa from "./Objeto";

class TerrenoMontanhos extends ObjetoDoMapa {
    static valor_hard_code_na_matriz = '0';

    constructor(i, j) {
        const tempo = 200;

        super(i, j, tempo);
    }
}

export default TerrenoMontanhos;
