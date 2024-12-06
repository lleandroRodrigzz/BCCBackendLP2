//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl{

    gravar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const nome  = requisicao.body.nome;
            const email = requisicao.body.email;
            const cidade = requisicao.body.cidade;
            const estado = requisicao.body.estado;
            const cpf = requisicao.body.cpf;
            //pseudo validação
            if (nome,email,cidade,estado,cpf)
            {
                //gravar a user
                const cliente = new Cliente(0,nome,email,cidade,estado,cpf);
                cliente.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Cliente adicionado com sucesso!",
                        "codigo": cliente.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir o cliente: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um usuario conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            const nome  = requisicao.body.nome;
            const email = requisicao.body.email;
            const cidade = requisicao.body.cidade;
            const estado = requisicao.body.estado;
            const cpf = requisicao.body.cpf;
            
            //pseudo validação
            if (codigo > 0 && nome && email && cidade && estado && cpf)
            {
                //alterar a user
                const cliente = new Cliente(codigo,nome,email,cidade,estado,cpf);
                cliente.editar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Cliente alterado com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar o cliente: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados de um usuario conforme documentação da API."
                    }
                );
            }
        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE'){
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            //pseudo validação
            if (codigo > 0)
            {
                //excluir o user
                const cliente = new Cliente(codigo);
                cliente.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Cliente excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o cliente: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido de um usuario conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo;
            //evitar que código tenha valor undefined
            if (isNaN(codigo)){
                codigo = "";
            }

            const cliente = new Cliente();
            //método consultar retorna uma lista de categorias
            cliente.consultar(codigo)
            .then((listaClientes) =>{
                resposta.status(200).json(listaClientes);
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar clientes:" + erro.message    
                    }
                );
            });

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}