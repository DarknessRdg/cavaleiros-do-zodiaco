import utils from "../utils";

class No {
    constructor ({ i, j, custo, heuristica, em_direcao_a, no_pai = undefined }) {
        this.i = i;
        this.j = j;

        this.custo_bruto = custo;

        this.pai = no_pai;
        this.em_direcao_a = em_direcao_a;

        if (this._tem_pai()) {
            // custo de chegada até o nó é o somátorio do
            // nó anterior com o seu próprio custo
            custo += this.pai.custo;
        }

        this.custo = custo;
        this.heuristica = heuristica;
        this.custo_avaliativo = this.custo + this.heuristica;
    }

    /**
     * Retorna um array com as coordenadas (i, j) do nó.
     * 
     * @returns {Array<Number>(2)}
     */
    coordenadas() { return [this.i, this.j]; }

    eh_casa() {
        return utils.arrayEquals(this.coordenadas(), this.em_direcao_a.coordenadas());
    }

    /**
     * @private
     */
    _tem_pai() { return this.pai !== undefined; }

    /**
     * Retorna uma array com a ordem do caminho do início até
     * o nó atual.
     * 
     * @returns {Array<No>}
     */
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
