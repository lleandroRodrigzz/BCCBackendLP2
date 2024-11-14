import CategoriaDAO from "../Persistencia/categoriaDAO.js";

export default class Categoria {
    // Atributos privados usando a sintaxe #
    #id;
    #descricao;
    #tipo;

    // Construtor da classe
    constructor(id, descricao, tipo) {
        this.#id = id;       // Atribuindo valor ao atributo privado
        this.#descricao = descricao;  // Atribuindo valor ao atributo privado
        this.#tipo = tipo
    }

    // Método get para o atributo codigo
    get id() {
        return this.#id;
    }

    // Método set para o atributo codigo
    set id(value) {
        this.#id = value;
    }

    // Método get para o atributo descricao
    get descricao() {
        return this.#descricao;
    }

    // Método set para o atributo descricao
    set descricao(value) {
        this.#descricao = value;
    }

    // Método get para o atributo descricao
    get tipo() {
        return this.#tipo;
    }

    // Método set para o atributo descricao
    set tipo(value) {
        this.#tipo = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#id,
            descricao: this.#descricao,
            tipo: this.#tipo
        };
    }

    async gravar(){
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async editar(){
        const catDAO = new CategoriaDAO();
        await catDAO.editar(this);
    }

    async excluir(){
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async consultar(termo){
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(termo);
    }
}