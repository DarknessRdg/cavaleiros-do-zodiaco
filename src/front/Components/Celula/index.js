import React from 'react';
import './style.css';

const TipoDeCelula = {
    'TerrenoMontanhos': 'montanhoso',
    'TerrenoPlano': 'plano',
    'TerrenoRochoso': 'rochoso',
    'Casa': 'casa'
}

export default function CelulaDoMapa({ objeto_do_jogo }) {
    let de_inicio = ''
    let de_destino = ''
    let caminho = ''
    

    if (objeto_do_jogo.de_inicio) {
        de_inicio = 'inicio'
    } else if (objeto_do_jogo.de_destino) {
        de_destino = 'destino'
    } else if (objeto_do_jogo.passou_por_aqui && !objeto_do_jogo.eh_casa) {
        caminho = 'passou'
    }

    

    const tipo_de_celula = TipoDeCelula[objeto_do_jogo.constructor.name];

    return <div className={`celula ${tipo_de_celula} ${de_inicio} ${caminho} ${de_destino}`}></div>
}
