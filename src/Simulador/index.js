import load_mapa from '../Mapa';
import BuscarMelhorCombinacaoDeBatalha from './Batalhas';
import BuscarMenorCaminho from './BuscarMenorCaminho';
import params from './params';

class Simulador {
    constructor() {
        this.dados_do_mapa = load_mapa();

        this.buscador_de_batalhas = new BuscarMelhorCombinacaoDeBatalha({
            casas: this.dados_do_mapa.casas,
            cavaleiros: this.dados_do_mapa.cavaleiros
        });
        this.buscador_de_batalhas.atualizar_tempo_das_casa();

        this.buscador_de_caminho = new BuscarMenorCaminho(
            this.dados_do_mapa.mapa,
            this.dados_do_mapa.casas,
            this.dados_do_mapa.objeto_inicio,
            this.dados_do_mapa.objeto_destino
        );
    }

    econtrar_caminho() {
        console.log(this.buscador_de_batalhas);

        return { 
            caminho: this.buscador_de_caminho.econtrar_caminho(),
            mapa: this.dados_do_mapa.mapa,
            tempo_maximo: params.TEMPO_MAXIMO_EM_MIN
        }
    }
}


export default Simulador;
