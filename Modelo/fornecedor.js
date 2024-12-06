import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    #codigo;
    #nome;
    #categoria;
    #email;
    #cidade;
    #estado;
    #cnpj;

    constructor(codigo, nome, categoria, email, cidade, estado, cnpj) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#categoria = categoria; // Deve ser um objeto com { codigo, descricao }
        this.#email = email;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cnpj = cnpj;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(value) {
        this.#codigo = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
    }

    get categoria() {
        return this.#categoria;
    }

    set categoria(value) {
        this.#categoria = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(value) {
        this.#cidade = value;
    }

    get estado() {
        return this.#estado;
    }

    set estado(value) {
        this.#estado = value;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(value) {
        this.#cnpj = value;
    }

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

    async incluir() {
        const forneDAO = new FornecedorDAO();
        await forneDAO.gravar(this);
    }

    async alterar() {
        const forneDAO = new FornecedorDAO();
        await forneDAO.editar(this);
    }

    async excluir() {
        const forneDAO = new FornecedorDAO();
        await forneDAO.excluir(this);
    }

    async consultar(termo) {
        const forneDAO = new FornecedorDAO();
        return await forneDAO.consultar(termo);
    }
}
