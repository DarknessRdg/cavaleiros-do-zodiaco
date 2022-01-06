import PriorityQueue from "js-priority-queue";


/**
 * Fila de prioridade para armazenar e retornar
 * o elemento de menor custo.
 */
class FilaDePrioridade {
    constructor ({ get_prioridade }) {

        this.fila = new PriorityQueue({
            strategy: PriorityQueue.BinaryHeapStrategy,
            comparator: (no_a, no_b) => get_prioridade(no_a) - get_prioridade(no_b)
        });
    }

    /**
     * Adiciona um elemento na fila de prioridade
     * @param {*} no 
     */
    enfileira(no) {
        this.fila.queue(no);
    }


    /**
     * Adiciona todos os elementos do vetor elemento 
     * na fila de prioridade
     * @param {Array<*>} todos 
     */
    enfileira_todos(todos) {
        todos.forEach(it => this.enfileira(it));
    }

    /**
     * Remove e retorna o elemento da fila de prioridade
     * @returns {*}
     */
    desenfileira() {
        return this.fila.dequeue();
    }

    /**
     * Verifica se a fila está vazia
     * 
     * @returns {Boolean}
     */
    esta_vazia() {
        return this.fila.length === 0;
    }

    /**
     * Esvazia a fila
     */
    esvaziar() {
        while (!this.esta_vazia()) {
            this.desenfileira();
        }
    }
}


export default FilaDePrioridade;
