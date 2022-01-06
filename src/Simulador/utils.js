function arrayEquals(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Retorna o {ObjetoDoMapa} da coordenada acima
 * 
 * @param {ObjetoDoMapa | No} no 
 * @returns {ObjetoDoMapa}
 */
 function cima(no) {
    return this.mapa[no.i-1][no.j];
}

/**
 * Retorna o {ObjetoDoMapa} da coordenada abaixo
 * 
 * @param {ObjetoDoMapa | No} no 
 * @returns {ObjetoDoMapa}
 */
function baixo(no) {
    return this.mapa[no.i+1][no.j];
}

/**
 * Retorna o {ObjetoDoMapa} da coordenada à esquerda
 * 
 * @param {ObjetoDoMapa | No} no 
 * @returns {ObjetoDoMapa}
 */
 function esquerda(no) {
    return this.mapa[no.i][no.j-1];
}

/**
 * Retorna o {ObjetoDoMapa} da coordenada à direita
 * 
 * @param {ObjetoDoMapa | No} no 
 * @returns {ObjetoDoMapa}
 */
 function direita(no) {
    return this.mapa[no.i][no.j+1];
}


export default {
    arrayEquals
};


