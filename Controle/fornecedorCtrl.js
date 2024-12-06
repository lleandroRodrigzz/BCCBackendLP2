import Fornecedor from "../Modelo/fornecedor.js";
import Categoria from "../Modelo/categoria.js";

export default class FornecedorCtrl {
    // Método para gravar um fornecedor
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { nome, categoria, email, cidade, estado, cnpj } = requisicao.body;

            if (!nome || !categoria?.codigo || !email || !cidade || !estado || !cnpj) {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Dados incompletos. Consulte a documentação da API."
                });
            }

            const categoriaObj = new Categoria(categoria.codigo);
            categoriaObj.consultar(categoria.codigo).then(listaCategorias => {
                if (listaCategorias.length === 0) {
                    return resposta.status(400).json({
                        status: false,
                        mensagem: "Categoria inválida!"
                    });
                }

                const fornecedor = new Fornecedor(0, nome, categoriaObj, email, cidade, estado, cnpj);
                fornecedor.incluir()
                    .then(() => {
                        resposta.status(201).json({
                            status: true,
                            mensagem: "Fornecedor cadastrado com sucesso!",
                            codigo: fornecedor.codigo
                        });
                    })
                    .catch(erro => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao cadastrar fornecedor: " + erro.message
                        });
                    });
            }).catch(erro => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao validar categoria: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida. Consulte a documentação da API."
            });
        }
    }

    // Método para editar um fornecedor
    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            const { nome, categoria, email, cidade, estado, cnpj } = requisicao.body;

            if (!codigo || !nome || !categoria?.codigo || !email || !cidade || !estado || !cnpj) {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Dados incompletos. Consulte a documentação da API."
                });
            }

            const categoriaObj = new Categoria(categoria.codigo);
            categoriaObj.consultar(categoria.codigo).then(listaCategorias => {
                if (listaCategorias.length === 0) {
                    return resposta.status(400).json({
                        status: false,
                        mensagem: "Categoria inválida!"
                    });
                }

                const fornecedor = new Fornecedor(codigo, nome, categoriaObj, email, cidade, estado, cnpj);
                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor alterado com sucesso!"
                        });
                    })
                    .catch(erro => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Erro ao alterar fornecedor: " + erro.message
                        });
                    });
            }).catch(erro => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao validar categoria: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida. Consulte a documentação da API."
            });
        }
    }

    // Método para excluir um fornecedor
    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'DELETE') {
            const codigo = requisicao.params.codigo;

            if (!codigo) {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Informe um código válido para exclusão."
                });
            }

            const fornecedor = new Fornecedor(codigo);
            fornecedor.excluir()
                .then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Fornecedor excluído com sucesso!"
                    });
                })
                .catch(erro => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir fornecedor: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida. Consulte a documentação da API."
            });
        }
    }

    // Método para consultar fornecedores
    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'GET') {
            const codigo = requisicao.params.codigo || "";
            const termo = isNaN(parseInt(codigo)) ? requisicao.query.nome || "" : codigo;

            const fornecedor = new Fornecedor();
            fornecedor.consultar(termo)
                .then(listaFornecedores => {
                    const fornecedoresCompletos = listaFornecedores.map(fornecedor => fornecedor.toJSON());
                    resposta.status(200).json(fornecedoresCompletos);
                })
                .catch(erro => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar fornecedores: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida. Consulte a documentação da API."
            });
        }
    }
}
