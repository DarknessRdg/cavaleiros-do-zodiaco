import FilaDePrioridade from "../FilaDePrioridade";
import No from './No';

function combinacoes(valuesArray) {
    var combi = [];
    var temp = [];
    var slent = Math.pow(2, valuesArray.length);

    for (var i = 0; i < slent; i++) {
        temp = [];
        for (var j = 0; j < valuesArray.length; j++) {
            if ((i & Math.pow(2, j))) {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0) {
            combi.push(temp);
        }
    }

    combi = combi.filter(it => it.length <= 2);
    return combi;
}


export default class BuscarMelhorCombinacaoDeBatalha {
    constructor({ casas, cavaleiros }) {
        this.casas = casas;
        this._ordenar_as_casa();

        this.cavaleiros = cavaleiros;

        this.fronteira = new FilaDePrioridade({
            get_prioridade: (no) => no.custo_avaliativo
        })

        this.casas_visitadas = new Set();
    }

    _ordenar_as_casa() {
        this.casas.sort((casa_a, casa_b) => 
            // negativo porque deseja ordenar as casa da
            // última (12) para a primeira (1)
            -(casa_a.posicao - casa_b.posicao)
        );
    }

    atualizar_tempo_das_casa() {
        const caminho = this._busca_a_estrela();

        caminho.forEach(no => {
            const casa = this._get_casa(no.casa.posicao);
            casa.tempo = no.tempo_de_luta;
            casa.timte = no.time;
        })
        
    }

    _busca_a_estrela() {
        this.fronteira.enfileira_todos(
            this._criar_nos(this.casas[0], undefined)
        )

        var cont = 0;
        while (!this.fronteira.esta_vazia()) {
            cont ++;
            const no = this.fronteira.desenfileira();

            console.log(no);

            if (this.esta_na_ultima_casa(no)) {
                const c = no.caminho();
                console.log('caminho encontra', c);
                for (const i of c) {
                    console.log('casa', i.casa.posicao, ' ----', i.time.map(it => it.nome))
                }
                return c;
            }

            console.log(cont)
            if (cont === 50000) break;

            this.fronteira.enfileira_todos(
                this.adjacentes(no)
            )
        }
        console.log('casa visitadas', this.casas_visitadas)
    }

    adjacentes(no) {
        console.log('adjacentes ao no', no);

        if (no.algum_cavaleiro_vivo()) {
            const proxima_casa = this._get_casa(no.casa.posicao - 1);
            return this._criar_nos(proxima_casa, no);
        }
        return [];
    }

    achou_no_destino(no) {
        return this.esta_na_ultima_casa(no) && no.algum_cavaleiro_vivo();
    }

    esta_na_ultima_casa(no) {
        const ultima_casa = this.casas[this.casas.length - 1];
        return no.casa.posicao === ultima_casa.posicao;
    }

    _criar_nos(casa, no_anterior) {
        if (no_anterior && this.esta_na_ultima_casa(no_anterior)) return [];

        this.casas_visitadas.add(casa.posicao);
    
        console.log('criando nos para casa', casa)
        console.log('no anteior', no_anterior);

        let todos_cavaleiros = this.cavaleiros;

        if (no_anterior !== undefined) {
            todos_cavaleiros = no_anterior.todos_cavaleiros;
        }

        const times = combinacoes(todos_cavaleiros)

        return times.map(time => new No({
            time: time,
            casa: casa,
            pai: no_anterior,
            todos_cavaleiros: todos_cavaleiros.map(it => it.clone())
        })).filter(it => it.todos_do_time_vivo());
    
    }
    _get_casa(posicao) {
        const index = this.casas.length - posicao;
        return this.casas[index];
    }
}
