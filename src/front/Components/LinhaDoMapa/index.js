import React from 'react';

import CelulaDoMapa from "../Celula";
import './style.css';

export default function LinhaDoMapa({ linha }) {   
    return <div className="linha">
        {linha.map((celula, index) => <CelulaDoMapa key={index} objeto_do_jogo={celula} /> )}
    </div>
};

