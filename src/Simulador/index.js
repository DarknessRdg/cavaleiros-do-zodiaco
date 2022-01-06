import load_mapa from '../Mapa';
import BuscarMenorCaminho from './BuscarMenorCaminho';
import params from './params';

class Simulador {
    constructor() {
        this.dados_do_mapa = load_mapa();
    }

    econtrar_caminho() {
        const bucar_menor_caminho = new BuscarMenorCaminho(
            this.dados_do_mapa.mapa,
            this.dados_do_mapa.casas,
            this.dados_do_mapa.objeto_inicio,
            this.dados_do_mapa.objeto_destino
        );

        return { 
            caminho: bucar_menor_caminho.econtrar_caminho(),
            mapa: this.dados_do_mapa.mapa,
            tempo_maximo: params.TEMPO_MAXIMO_EM_MIN
        }
    }
}


export default Simulador;
