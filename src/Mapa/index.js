import Casa from './ObjetosDoMapa/Casa';
import TerrenoMontanhos from './ObjetosDoMapa/TerrenoMontanhoso';
import TerrenoPlano from './ObjetosDoMapa/TerrenoPlano';
import TerrenoRochoso from './ObjetosDoMapa/TerrenoRochoso';
import mapa from './mapa';
import Cavaleiro from './Cavaleiros';


function load_mapa() {
    console.log('loading...')
    const casas = [];

    const linhas = mapa.split('\n').filter(it => it !== '');
    
    const mapa_com_objetos = linhas.map((linha, index_i) => linha.split(',').map((celula_hard_code, index_j) => {
        const obj = from_mapa(celula_hard_code, index_i, index_j);

        if (obj instanceof Casa) {
            casas.push(obj);
        }

        return obj;
    }));

    const objeto_inicio = mapa_com_objetos[37][37];
    objeto_inicio.de_inicio = true;

    const objeto_destino = mapa_com_objetos[4][37];
    objeto_destino.de_destino = true;

    return {
        mapa: mapa_com_objetos, 
        casas: casas,
        objeto_inicio: objeto_inicio,
        objeto_destino: objeto_destino,
        cavaleiros: Cavaleiro.todos()
    };
}

/**
 * Retorna o terreno a partir do valor no mapa `.txt`
 * 
 * @param {String} valor_no_mapa 
 */
function from_mapa(valor_no_mapa, i, j) {
    if (eh_casa(valor_no_mapa)) {
        return new criar_casa(valor_no_mapa, i, j);
    }
    return criar_terreno(valor_no_mapa, i, j);
}


function criar_casa(valor_no_mapa, i, j) {
    const direcao_da_porta = valor_no_mapa[1];
    const posicao_da_casa = parseInt(valor_no_mapa.substring(2));

    return new Casa(posicao_da_casa, direcao_da_porta, i, j);
}


function criar_terreno(valor_no_mapa, i, j) {
    const terrenos = [TerrenoMontanhos, TerrenoRochoso, TerrenoPlano];

    const TipoDeTerreno = terrenos.filter(it => 
        it.valor_hard_code_na_matriz === valor_no_mapa
    )[0];

    return new TipoDeTerreno(i, j);
}


/**
 * Retorna o terreno a partir do valor no mapa `.txt`
 * 
 * @param {String} valor_no_mapa 
 * @returns Terreno
 */
function eh_casa(valor_no_mapa) {
    return valor_no_mapa.startsWith('c')
}


export default load_mapa;
