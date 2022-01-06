import load_mapa from '../Mapa';
import FilaDePrioridade from './FilaDePrioridade';
import No from './No';
import params from './params';

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

            if (this.achou_no_de_destino(no)) {
                return no.caminho_da_raiz_ate_o_no();
            }

            cont ++;
            if (cont === 200) break;
            this.fronteira.enfileira_todos(this.adjacentes(no));
        }

        console.log(this.fronteira.fila)
    }

    get_casa(posicao) {return this.casas.filter(it => it.posicao === posicao)[0]; }

    achou_no_de_destino(no) {
        return no.coordenadas() === this.destino.coordenadas();
    }

    adjacentes(no) {
        console.log('add aj', no)
        if (no.eh_casa()) {
            return this.adjacentes_da_casa(no.proxima_casa);
        }

        const [i, j] = no.coordenadas();

        const adj = [
            this.no_a_patir_do_objeto({obj: this.mapa[i+1][j], pai: no, em_direcao_a_casa: no.proxima_casa}),
            this.no_a_patir_do_objeto({obj: this.mapa[i-1][j], pai: no, em_direcao_a_casa: no.proxima_casa}),
            this.no_a_patir_do_objeto({obj: this.mapa[i][j+1], pai: no, em_direcao_a_casa: no.proxima_casa}),
            this.no_a_patir_do_objeto({obj: this.mapa[i][j-1], pai: no, em_direcao_a_casa: no.proxima_casa}),
        ]

        return adj.filter(it => it.custo <= params.TEMPO_MAXIMO_EM_MIN);
    }

    adjacentes_da_casa(casa) {
        return []
    }

    no_a_patir_do_objeto({ obj, pai, em_direcao_a_casa }) {
        console.log('criar no para obj', obj)
        console.log('criar no para obj em_direcao_a_casa', em_direcao_a_casa)
        
        return new No({ 
            i: obj.i, 
            j: obj.j, 
            custo: obj.tempo, 
            heuristica: this.custo_ate_proxima_casa(obj, pai),
            no_pai: pai,
            proxima_casa: em_direcao_a_casa
        })
    }


    custo_ate_proxima_casa(no, pai) {
        return 0
        // if (!pai) return 0;

        // const [i_casa, j_casa] = pai.proxima_casa.coordenadas();
        // const [i, j] = no.coordenadas();

        // return Math.abs(i_casa - i) + Math.abs(j_casa - j);
    }
};


export default Simulador;
