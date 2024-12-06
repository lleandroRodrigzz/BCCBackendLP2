import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    // Atributos privados usando a sintaxe #
    #codigo
    #nomeUsuario;
    #emailUsuario;
    #senhaUsuario;
    #tipoUsuario;

    // Construtor da classe
    constructor(codigo,nomeUsuario, emailUsuario, senhaUsuario, tipoUsuario) {
        this.#codigo = codigo;
        this.#nomeUsuario = nomeUsuario;       // Atribuindo valor ao atributo privado
        this.#emailUsuario = emailUsuario;  // Atribuindo valor ao atributo privado
        this.#senhaUsuario = senhaUsuario;
        this.#tipoUsuario = tipoUsuario;
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
    get nomeUsuario() {
        return this.#nomeUsuario;
    }

    // Método set para o atributo codigo
    set nomeUsuario(value) {
        this.#nomeUsuario = value;
    }

    // Método get para o atributo descricao
    get emailUsuario() {
        return this.#emailUsuario;
    }

    // Método set para o atributo descricao
    set emailUsuario(value) {
        this.#emailUsuario = value;
    }

    // Método get para o atributo descricao
    get senhaUsuario() {
        return this.#senhaUsuario;
    }

    // Método set para o atributo descricao
    set senhaUsuario(value) {
        this.#senhaUsuario = value;
    }

    // Método get para o atributo descricao
    get tipoUsuario() {
        return this.#tipoUsuario;
    }

    // Método set para o atributo descricao
    set tipoUsuario(value) {
        this.#tipoUsuario = value;
    }

    // Método toJSON para conversão em JSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nomeUsuario: this.#nomeUsuario,
            emailUsuario: this.#emailUsuario,
            senhaUsuario: this.#senhaUsuario,
            tipoUsuario: this.#tipoUsuario
        };
    }

    async gravar(){
        const userDAO = new UsuarioDAO();
        await userDAO.gravar(this);
    }

    async editar(){
        const userDAO = new UsuarioDAO();
        await userDAO.editar(this);
    }

    async excluir(){
        const userDAO = new UsuarioDAO();
        await userDAO.excluir(this);
    }

    async consultar(termo){
        const userDAO = new UsuarioDAO();
        return await userDAO.consultar(termo);
    }
}