import PriorityQueue from "js-priority-queue";


class FilaDePrioridade {
    constructor ({ get_prioridade }) {

        this.fila = new PriorityQueue({
            strategy: PriorityQueue.BinaryHeapStrategy,
            comparator: (no_a, no_b) => get_prioridade(no_a) - get_prioridade(no_b)
        });
    }

    enfileira(no) {
        this.fila.queue(no);
    }

    enfileira_todos(todos) {
        todos.forEach(it => this.enfileira(it));
    }

    desenfileira() {
        return this.fila.dequeue();
    }

    esta_vazia() {
        return this.fila.length === 0;
    }
}


export default FilaDePrioridade;
