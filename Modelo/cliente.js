import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente {
    // Atributos privados usando a sintaxe #
    #codigo
    #nome;
    #email;
    #cidade;
    #estado;
    #cpf

    // Construtor da classe
    constructor(codigo,nome,email,cidade,estado,cpf) {
        this.#codigo = codigo;
        this.#nome = nome;       // Atribuindo valor ao atributo privado
        this.#email = email;  // Atribuindo valor ao atributo privado
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cpf = cpf;
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
    get cpf() {
        return this.#cpf;
    }

    // Método set para o atributo descricao
    set cpf(value) {
        this.#cpf = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            email: this.#email,
            cidade: this.#cidade,
            estado: this.#estado,
            cpf: this.#cpf
        };
    }

    async gravar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.gravar(this);
    }

    async editar(){
        const cliDAO = new ClienteDAO();
        await cliDAO.editar(this);
    }

    async excluir(){
        const cliDAO = new ClienteDAO();
        await cliDAO.excluir(this);
    }

    async consultar(termo){
        const cliDAO = new ClienteDAO();
        return await cliDAO.consultar(termo);
    }
}