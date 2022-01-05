import React from 'react';
import './style.css';

const TipoDeCelula = {
    'TerrenoMontanhos': 'montanhoso',
    'TerrenoPlano': 'plano',
    'TerrenoRochoso': 'rochoso',
    'Casa': 'casa'
}

export default function CelulaDoMapa({ objeto_do_jogo }) {
    let name = ''
    if (!isNaN(objeto_do_jogo)) {
        name = objeto_do_jogo;
    }

    const tipo_de_celula = TipoDeCelula[objeto_do_jogo.constructor.name];

    return <div className={`celula ${tipo_de_celula}`}>{name}</div>
}
