import utils from "./utils";

class No {
    constructor ({ i, j, custo, heuristica, proxima_casa, no_pai = undefined }) {
        this.i = i;
        this.j = j;

        this.custo_bruto = custo;

        this.pai = no_pai;
        this.proxima_casa = proxima_casa;

        if (this._tem_pai()) {
            custo += this.pai.custo;
        }

        this.custo = custo;
        this.heuristica = heuristica;
        this.custo_avaliativo = this.custo + this.heuristica;
    }

    coordenadas() { return [this.i, this.j]; }

    eh_casa() {
        return utils.arrayEquals(this.coordenadas(), this.proxima_casa.coordenadas());
    }

    /**
     * @private
     */
    _tem_pai() { return this.pai !== undefined; }

    caminho_da_raiz_ate_o_no() {
        let pai = this.pai;

        const caminho = [this];

        while (pai !== undefined) {
            caminho.push(pai);
            pai = pai.pai;
        }

        return caminho.reverse();
    }
}


export default No;
