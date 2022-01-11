import Casa from '../../Mapa/ObjetosDoMapa/Casa';
import FilaDePrioridade from '../FilaDePrioridade';
import No from './No';
import params from '../params';
import utils from '../utils';

const { arrayEquals } = utils;


export default class BuscarMenorCaminho {
    constructor(mapa, casas, obj_inicio, obj_destino) {
        this.mapa = mapa;
        this.casas = casas;

        this.fronteira = new FilaDePrioridade({
            get_prioridade: (no) => no.custo_avaliativo
        });


        // Nó que será usado para começar a simulação
        this.inicio = no_a_patir_do_objeto({
            obj: obj_inicio,
            pai: undefined,
            em_direcao_a: this.get_casa(1)
        });

        this.destino = obj_destino;
    }

    econtrar_caminho() {
        return this._busca_a_estrela_camiho_ate_destino();
    }

    
    /**
     * Implementação de busaca A estrela para encontrar o caminho
     * do ponto de início até o ponto de destino passando
     * por todas as casa do zodíaco;
     * 
     * @returns {Array<No>}
     */
    _busca_a_estrela_camiho_ate_destino() {
        this.inicio.de_inicio = true;

        this.fronteira.enfileira(this.inicio);

        while (!this.fronteira.esta_vazia()) {
            const no = this.fronteira.desenfileira();
            this.visitar(no)

            if (this.achou_no_de_destino(no)) {
                return no.caminho_da_raiz_ate_o_no();
            }

            this.fronteira.enfileira_todos(this.adjacentes(no));
        }

        console.log(this.fronteira.fila)
    }

    /**
     * Marca o nó como visitado
     * 
     * @param {No} no 
     */
    visitar(no) {
        this.mapa[no.i][no.j].visitado = true;
    }

    /**
     * Retona a casa do jogo de posição igual à posição informada.
     * Caso a posição não exista, então é retornado undefined.
     * 
     * @param {Number} posicao 
     * @returns {Casa?}
     */
    get_casa(posicao) {return this.casas.filter(it => it.posicao === posicao)[0]; }

    /**
     * Verifica se o nó fornecido é o nó de destino.
     * 
     * @param {No} no 
     * @returns {Boolean}
     */
    achou_no_de_destino(no) {
        return arrayEquals(no.coordenadas(), this.destino.coordenadas());
    }

    /**
     * Retorna os Nós adjacentes ao nó fornecido.
     * 
     * @param {No} no 
     * @returns {Array<no>}
     */
    adjacentes(no) {
        if (no.eh_casa()) {
            return this.adjacentes_da_casa(no);
        }

        return this.adjacentes_do_terreno(no);
    }

    /**
     * Retorna os adjacentes ao terreno. Em poucas palavras,
     * os nós adjacentes a qualquer terrenos são as posições
     * a cima, baixo, esquerda e direita ao nó.
     * 
     * @param {No} no_terreno 
     * @returns {Array<No>}
     */
    adjacentes_do_terreno(no_terreno) {
        const objetos_ajd = [
            this.cima(no_terreno),
            this.baixo(no_terreno),
            this.esquerda(no_terreno),
            this.direita(no_terreno)
        ].map(it => no_a_patir_do_objeto({
            obj: it, 
            pai: no_terreno, 
            em_direcao_a: no_terreno.em_direcao_a
        }))

        return objetos_ajd
            .filter(it => it.custo_bruto < 200)
            .filter(it => !this.mapa[it.i][it.j].visitado)
            .filter(it => it.custo <= params.TEMPO_MAXIMO_EM_MIN);
    }

    /**
     * Retorona uma lista com os nós adjanteces à casa.
     * Em poucas palavras, o nó adjancente é sempre a "porta de sáida",
     * ou seja, a casa contrária em direção à porta.
     * 
     * @param {No} no_casa 
     * @returns {Array<No>}
     */
    adjacentes_da_casa(no_casa) {
        const casa = no_casa.em_direcao_a;
        let detino = this.get_casa(casa.posicao + 1);

        if (detino === undefined) {
            // o nó casa refere-se à ultima casa
            // e prontanto o próximo ponto de chegada
            // é o destino
            detino = this.destino;
        }

        // já foi encontrado o melhor caminho até a casa local,
        // portanto não é necessário continuar validando os
        // caminhos até ateriores à essa casa
        this.fronteira.esvaziar();


        const build_no = (obj) => no_a_patir_do_objeto({
            obj: obj, 
            pai: no_casa, 
            em_direcao_a: detino
        })

        if (casa.esta_para_esquerda()) {
            return [ build_no(this.direita(no_casa)) ]
        }

        if (casa.esta_para_direita()) {
            return [ build_no(this.esquerda(no_casa)) ]
        }

        if (casa.esta_para_baixo()) {
            return [ build_no(this.cima(no_casa)) ]
        }
    }

    /**
     * Retorna o {ObjetoDoMapa} da coordenada acima
     * 
     * @param {ObjetoDoMapa | No} no 
     * @returns {ObjetoDoMapa}
     */
    cima(no) {
        return this.mapa[no.i-1][no.j];
    }

    /**
     * Retorna o {ObjetoDoMapa} da coordenada abaixo
     * 
     * @param {ObjetoDoMapa | No} no 
     * @returns {ObjetoDoMapa}
     */
    baixo(no) {
        return this.mapa[no.i+1][no.j];
    }

    /**
     * Retorna o {ObjetoDoMapa} da coordenada à esquerda
     * 
     * @param {ObjetoDoMapa | No} no 
     * @returns {ObjetoDoMapa}
     */
    esquerda(no) {
        return this.mapa[no.i][no.j-1];
    }

    /**
     * Retorna o {ObjetoDoMapa} da coordenada à direita
     * 
     * @param {ObjetoDoMapa | No} no 
     * @returns {ObjetoDoMapa}
     */
    direita(no) {
        return this.mapa[no.i][no.j+1];
    }

};

/**
 * Função auxiliara para um nó para um objeto do jogo
 * 
 * @param {obg: ObjetoDoJogo, pai: No, direcao_a: ObjetoDoJogo} param0 
 * @returns {No}
 */
function no_a_patir_do_objeto({ obj, pai, em_direcao_a }) {
    let custo = obj.tempo;

    return new No({ 
        i: obj.i, 
        j: obj.j, 
        custo: custo,
        heuristica: custo_ate_proximo_destino(obj, pai),
        no_pai: pai,
        em_direcao_a: em_direcao_a
    });
}

/**
 * Heurística de cada nó é a sua distância o mais reto possível 
 * até a casa mais próxima. Em outras palavaras,
 * é a quantidade de casa na horizontal + vertial
 * 
 * @param {ObjetoDoJogo | No} no 
 * @param {No} pai 
 * @returns {Number}
 */
function custo_ate_proximo_destino(no, pai) {
    if (!pai) return 0;

    const [casa_i, casa_j] = pai.em_direcao_a.coordenadas();
    const [i, j] = no.coordenadas();

    return Math.abs(casa_i - i) + Math.abs(casa_j - j);
}
