export default class No {
    constructor({ time, casa, todos_cavaleiros, pai = undefined }) {
        this.time = time;
        this.todos_cavaleiros = todos_cavaleiros;
        this.pai = pai;
        this.casa = casa;

        let custo = this._calcular_tempo_de_luta(time);

        if (this._tem_pai()) {
            // tempo de chagade até a casa atual, é o tempo
            // da casa aterior + casa
            custo += this.pai.custo;
        }

        this.custo = custo;
        this.custo_avaliativo = custo - this._poder_te_todos() * (12 - casa.posicao + 1);

        this._lutar();
    }

    _tem_pai() { return this.pai !== undefined; }

    todos_do_time_vivo() {
        const vivos = this.time.filter(cavaleiro => cavaleiro.esta_vivo());
        return vivos.length === this.time.length;
    }

    algum_cavaleiro_vivo() {
        return this.todos_cavaleiros.filter(cavaleiro => cavaleiro.esta_vivo()).length > 0;
    }

    _lutar() {

        for (const cavaleiro of this.time) {
            this._get_cavaleiro(cavaleiro).lutar();
        }
    }

    _get_cavaleiro(procurado) {
        for (const cavaleiro of this.todos_cavaleiros) {
            if (cavaleiro.nome === procurado.nome) return cavaleiro;
        }
    }

    _calcular_tempo_de_luta() {
        return this.casa.calcular_tempo_da_luta(this.time);
    }

    caminho() {
        let pai = this.pai;

        const caminho = [this];

        while (pai !== undefined) {
            caminho.push(pai);
            pai = pai.pai;
        }

        return caminho.reverse();
    }

    _poder_te_todos() {
        let poder = 0;

        for (const cavaleiro of this.time) {
            poder += cavaleiro.poder_cosmico;
        }
        return poder;
    }
};
