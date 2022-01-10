class Cavaleiro {
    constructor({ nome, poder_cosmico }) {
        this.nome = nome;
        this.poder_cosmico = poder_cosmico;

        this.pontos_de_vida = 5;
    }

    esta_vivo() {
        return this.pontos_de_vida > 0;
    }

    lutar() {
        this.pontos_de_vida--;
    }

    clone() {
        const outro = new Cavaleiro({
            nome: this.nome,
            poder_cosmico: this.poder_cosmico
        });

        outro.pontos_de_vida = this.pontos_de_vida;
        return outro;
    }
}


Cavaleiro.todos = () => [
    new Cavaleiro({ nome: 'Seiya', poder_cosmico: 1.5 }),
    new Cavaleiro({ nome: 'Shiryu', poder_cosmico: 1.4 }),
    new Cavaleiro({ nome: 'Hyoga', poder_cosmico: 1.3 }),
    new Cavaleiro({ nome: 'Shun', poder_cosmico: 1.2 }),
    new Cavaleiro({ nome: 'Ikki', poder_cosmico: 1.1 })
];


export default Cavaleiro;
