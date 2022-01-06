import React from 'react';

import Simulador from '../../../Simulador';
import LinhaDoMapa from '../LinhaDoMapa';
import adicionar_informacoes_ao_mapa from './AdicionarInformacoesAoMapa';

export default function Mapa() {
    const simulador = new Simulador();

    const { mapa, caminho, tempo_maximo } = simulador.econtrar_caminho();

    console.log(caminho);

    adicionar_informacoes_ao_mapa(mapa, caminho)

    function custo_total() {
        const ultimo = caminho[caminho.length - 1];
        return ultimo.custo;
    }

    return <div>

        <div className="mapa-do-jogo">
            <h1>Mapa</h1>

            <div>
                <h3>Informações do percurso:</h3>
                <ul>
                    <li>Tempo máximo do jogo: {tempo_maximo} minutos</li>
                    <li>Custo total do percurso: {custo_total()} minutos</li>
                </ul>
            </div>

            <>
                {mapa.map((linha, index) => <LinhaDoMapa key={index} linha={linha} /> )}
            </>
        </div>
    </div>
};
