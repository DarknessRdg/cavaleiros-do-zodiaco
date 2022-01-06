class ObjetoDoMapa {
    constructor (i, j, tempo) {
        this.i = i;
        this.j = j;
        this.tempo = tempo;
    }

    coordenadas() {
        return [this.i, this.j]
    }
}

export default ObjetoDoMapa;
