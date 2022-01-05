import ObjetoDoMapa from "./Objeto";

class TerrenoMontanhos extends ObjetoDoMapa {
    static valor_hard_code_na_matriz = '0';

    constructor(i, j) {
        super(i, j);

        this.tempo = 200;
    }
}

export default TerrenoMontanhos;
