import load_mapa from '../Mapa';

class Simulador {
    constructor() {
        const dados_do_mapa = load_mapa();

        this.mapa = dados_do_mapa.mapa;
        this.casas = dados_do_mapa.casas;
        this.inicio = dados_do_mapa.posicao_inicio
        this.destino = dados_do_mapa.posicao_de_destino

        this.posicao_da_casa_atual = 11;
    }

    casa_atual() {
        return this.casas.filter(it => it.posicao === this.posicao_da_casa_atual)[0];
    }

    econtrar_caminho() {
        return this.busca_a_estrela()
    }

    busca_a_estrela() {
        const [i, j] = this.inicio;

        this.adjacentes(i, j).forEach(it => this.custo_ate_proxima_casa(it))
        
    }

    adjacentes(i, j) {
        return [
            this.mapa[i+1][j],
            this.mapa[i-1][j],
            this.mapa[i][j+1],
            this.mapa[i][j+1]
        ]
    }

    custo_ate_proxima_casa(obj) {
        console.log(obj)
        const casa = this.casa_atual();
        console.log(casa)

        const esquerda = casa.j < obj.j;
        const cima = casa.i < obj.i;

        console.log(casa)
        console.log('esquerda', esquerda, 'cima', cima);
    }
};


export default Simulador;
