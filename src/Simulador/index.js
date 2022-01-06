import load_mapa from '../Mapa';
import Casa from '../Mapa/ObjetosDoMapa/Casa';
import FilaDePrioridade from './FilaDePrioridade';
import No from './No';
import params from './params';
import utils from './utils';

class Simulador {
    constructor() {
        const dados_do_mapa = load_mapa();
        
        this.fronteira = new FilaDePrioridade({
            get_prioridade: (no) => no.custo_avaliativo
        });

        this.mapa = dados_do_mapa.mapa;
        this.casas = dados_do_mapa.casas;

        this.inicio = dados_do_mapa.objeto_inicio;
        this.destino = dados_do_mapa.objeto_destino;
    }

    econtrar_caminho() {
        return this.busca_a_estrela()
    }

    
    busca_a_estrela() {
        this.inicio.de_inicio = true;

        this.fronteira.enfileira(this.no_a_patir_do_objeto({
            obj: this.inicio, 
            pai: undefined,
            em_direcao_a_casa: this.get_casa(1)
        }));

        var cont = 0
        while (!this.fronteira.esta_vazia()) {
            console.log(cont)
            const no = this.fronteira.desenfileira();
            this.visitar(no)

            if (this.achou_no_de_destino(no)) {
                return no.caminho_da_raiz_ate_o_no();
            }

            cont ++;
            if (cont === 2000) break;
            this.fronteira.enfileira_todos(this.adjacentes(no));
        }

        console.log(this.fronteira.fila)
    }

    visitar(no) {
        console.log('visitando no', no)
        this.mapa[no.i][no.j].visitado = true;
    }

    get_casa(posicao) {return this.casas.filter(it => it.posicao === posicao)[0]; }

    achou_no_de_destino(no) {
        return utils.arrayEquals(no.coordenadas(), this.destino.coordenadas());
    }

    adjacentes(no) {
        console.log('add adj para', no);

        if (no.eh_casa()) {
            return this.adjacentes_da_casa(no);
        }

        const objetos_ajd = [
            this.cima(no),
            this.baixo(no),
            this.esquerda(no),
            this.direita(no)
        ]


        return objetos_ajd
            .filter(it => it.tempo < 200)
            .map(it => this.no_a_patir_do_objeto({obj: it, pai: no, em_direcao_a_casa: no.proxima_casa}))
            .filter(it => !this.mapa[it.i][it.j].visitado)
            .filter(it => it.custo <= params.TEMPO_MAXIMO_EM_MIN);
    }

    adjacentes_da_casa(no_casa) {
        const casa = no_casa.proxima_casa;
        let proxima_casa = this.get_casa(casa.posicao+1);

        if (proxima_casa === undefined) {
            proxima_casa = this.destino;
        }

        console.log('ACHOU A CASA ----')
        console.log('caminho ate a casa: ', no_casa.caminho_da_raiz_ate_o_no());
        

        this.fronteira.esvaziar();

        console.log(this.fronteira)

        if (casa.esta_para_esquerda()) {
            return [ this.no_a_patir_do_objeto({
                obj: this.direita(no_casa), 
                pai: no_casa, 
                em_direcao_a_casa: proxima_casa
            })]
        }

        if (casa.esta_para_direita()) {
            return [ this.no_a_patir_do_objeto({
                obj: this.esquerda(no_casa), 
                pai: no_casa, 
                em_direcao_a_casa: proxima_casa
            })]
        }

        if (casa.esta_para_baixo()) {
            return [ this.no_a_patir_do_objeto({
                obj: this.cima(no_casa), 
                pai: no_casa, 
                em_direcao_a_casa: proxima_casa
            })]
        }
    }

    cima(no) {
        return this.mapa[no.i-1][no.j];
    }

    baixo(no) {
        return this.mapa[no.i+1][no.j];
    }

    esquerda(no) {
        return this.mapa[no.i][no.j-1];
    }

    direita(no) {
        return this.mapa[no.i][no.j+1];
    }

    no_a_patir_do_objeto({ obj, pai, em_direcao_a_casa }) {
        console.log('criar no para obj', obj)
        console.log('criar no para obj em_direcao_a_casa', em_direcao_a_casa)

        let c = obj.tempo;
        if (obj instanceof Casa) {
            c = 0;
        }

        return new No({ 
            i: obj.i, 
            j: obj.j, 
            custo: c, 
            heuristica: this.custo_ate_proxima_casa(obj, pai),
            no_pai: pai,
            proxima_casa: em_direcao_a_casa
        })
    }


    custo_ate_proxima_casa(no, pai) {
        if (!pai) return 0;

        const [casa_i, casa_j] = pai.proxima_casa.coordenadas();
        const [i, j] = no.coordenadas();

        return Math.abs(casa_i - i) + Math.abs(casa_j - j);
    }
};


export default Simulador;
