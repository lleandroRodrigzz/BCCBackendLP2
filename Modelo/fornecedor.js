import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados usando a sintaxe #
    #codigo
    #nome;
    #categoria;
    #email;
    #cidade;
    #estado;
    #cnpj;

    // Construtor da classe
    constructor(codigo,nome,categoria,email,cidade,estado,cnpj) {
        this.#codigo = codigo;
        this.#nome = nome;       // Atribuindo valor ao atributo privado
        this.#categoria = categoria;
        this.#email = email;  // Atribuindo valor ao atributo privado
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cnpj = cnpj;
    }

    // Método get para o atributo codigo
    get codigo() {
        return this.#codigo;
    }

    // Método set para o atributo codigo
    set codigo(value) {
        this.#codigo = value;
    }

    // Método get para o atributo codigo
    get nome() {
        return this.#nome;
    }

    // Método set para o atributo codigo
    set nome(value) {
        this.#nome = value;
    }

    // Método get para o atributo codigo
    get categoria() {
        return this.#categoria;
    }

    // Método set para o atributo codigo
    set categoria(value) {
        this.#categoria = value;
    }

    // Método get para o atributo descricao
    get email() {
        return this.#email;
    }

    // Método set para o atributo descricao
    set email(value) {
        this.#email = value;
    }

    // Método get para o atributo descricao
    get cidade() {
        return this.#cidade;
    }

    // Método set para o atributo descricao
    set cidade(value) {
        this.#cidade = value;
    }

    // Método get para o atributo descricao
    get estado() {
        return this.#estado;
    }

    // Método set para o atributo descricao
    set estado(value) {
        this.#estado = value;
    }

    // Método get para o atributo descricao
    get cnpj() {
        return this.#cnpj;
    }

    // Método set para o atributo descricao
    set cnpj(value) {
        this.#cnpj = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            categoria: this.#categoria,
            email: this.#email,
            cidade: this.#cidade,
            estado: this.#estado,
            cnpj: this.#cnpj
        };
    }

    async incluir(){
        const forneDAO = new FornecedorDAO();
        await forneDAO.gravar(this);
    }

    async alterar(){
        const forneDAO = new FornecedorDAO();
        await forneDAO.editar(this);
    }

    async excluir(){
        const forneDAO = new FornecedorDAO();
        await forneDAO.excluir(this);
    }

    async consultar(termo){
        const forneDAO = new FornecedorDAO();
        return await forneDAO.consultar(termo);
    }
}