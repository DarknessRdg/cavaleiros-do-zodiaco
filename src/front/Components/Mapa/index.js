import React from 'react';

import Simulador from '../../../Simulador';
import LinhaDoMapa from '../LinhaDoMapa';

export default function Mapa() {
    const simulador = new Simulador();
    simulador.econtrar_caminho();

    let mapa = simulador.mapa;

    mapa = mapa.map((it, index) => [index, ...it]);
    mapa = [
        mapa[0].map((_, index) => index-1),
        ...mapa
    ]


    return <div>
        
        <h1>Mapa</h1>

        <div className="mapa-do-jogo">
            {mapa.map((linha, index) => <LinhaDoMapa key={index} linha={linha} /> )}
        </div>
    </div>
};
