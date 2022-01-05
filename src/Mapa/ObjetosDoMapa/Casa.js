import ObjetoDoMapa from "./Objeto";

const DIFICULDADE_DAS_CASA_POR_POSICAO = {
    1: 50,
    2: 55,
    3: 60,
    4: 70,
    5: 75,
    6: 80,
    7: 85,
    8: 90,
    9: 95,
    10: 100,
    11: 110,
    12: 120
}

function PosicaoInvalida(posicao) {
    this.message = `Posicao informada inválida: ${posicao}`;
    this.posicao = posicao;
    this.name = 'PosicaoInvalida'
}


function DirecaoDaPortaInvalida(direcao) {
    this.message = `Direção da porta informada inválida: ${direcao}`;
    this.direcao = direcao;
    this.name = 'DirecaoDaPortaInvalida'
}

const DirecaoDaPorta = {
    'd': 'DIREITA',
    'e': 'ESQUERDA',
    'b': 'BAIXO',
};


class Casa extends ObjetoDoMapa {
    static QUANTIDADE_DE_CASAS = Object.keys(DIFICULDADE_DAS_CASA_POR_POSICAO).length;

    constructor(posicao, direcao_da_porta, i, j) {
        super(i, j);

        this.tempo = DIFICULDADE_DAS_CASA_POR_POSICAO[posicao];
        this.posicao = posicao;
        this.direcao_da_porta = DirecaoDaPorta[direcao_da_porta];

        if (this.direcao_da_porta === undefined) throw new DirecaoDaPortaInvalida(direcao_da_porta)
        if (this.tempo === undefined) throw new PosicaoInvalida(posicao);
    }
}

export default Casa;
