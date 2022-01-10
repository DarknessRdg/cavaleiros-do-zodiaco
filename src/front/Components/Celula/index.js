import React, { useState } from 'react';
import './style.css';

const TipoDeCelula = {
    'TerrenoMontanhos': 'montanhoso',
    'TerrenoPlano': 'plano',
    'TerrenoRochoso': 'rochoso',
    'Casa': 'casa'
}

const generateUUID = () => {
    let
      d = new Date().getTime(),
      d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
  };


function InformacoesCasa(casa) {
    const time = casa.time.map(it => it.nome).join(', ');

    return <>
        <li>Tempo de luta da casa: {casa.tempo}</li>
        <li>Quem lutou: {time}.</li>
    </>
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


    const id = 'uuid' + generateUUID().replaceAll('-', '');

    const tipo_de_celula = TipoDeCelula[objeto_do_jogo.constructor.name];

    return <div>
        <div
            data-bs-toggle="modal"
            data-bs-target={"#" + id}
            className={`celula ${tipo_de_celula} ${de_inicio} ${caminho} ${de_destino}`}
        >

        </div>

        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Informações da celula:</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <ul>
                        <li>Tipo de terrono: {tipo_de_celula}</li>
                        <li>Tempo necessário: {objeto_do_jogo.tempo}</li>

                        <li> Custo até a aqui: {objeto_do_jogo.passou_por_aqui ? objeto_do_jogo.passo.custo : "Não passou por aqui"} </li>

                        {objeto_do_jogo.eh_casa ? InformacoesCasa(objeto_do_jogo) : ""}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div>
}
