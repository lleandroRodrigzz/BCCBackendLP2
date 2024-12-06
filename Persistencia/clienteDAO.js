import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(50) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    cidade VARCHAR(50) NOT NULL,
                    estado VARCHAR(20) NOT NULL,
                    cpf VARCHAR(20) NOT NULL,
                    CONSTRAINT pk_cliente PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela cliente!");
        }
    }

    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "INSERT INTO cliente(nome,email,cidade,estado,cpf) VALUES (?,?,?,?,?)";
            const parametros = [cliente.nome,
                                cliente.email,
                                cliente.cidade,
                                cliente.estado,
                                cliente.cpf
            ];
            const resultado = await conexao.execute(sql,parametros);
            cliente.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async editar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "UPDATE cliente SET nome=?, email=?, cidade=?, estado=?, cpf=? WHERE codigo = ?";
            const parametros = [cliente.nome,
                                cliente.email,
                                cliente.cidade,
                                cliente.estado,
                                cliente.cpf,
                                cliente.codigo
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = "DELETE FROM cliente WHERE codigo = ?";
            const parametros = [cliente.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = "SELECT * FROM cliente WHERE nome LIKE ? ORDER BY nome";
            parametros.push("%"+termo+"%");
        }
        else{
            sql = "SELECT * FROM cliente WHERE codigo = ? ORDER BY nome";
            parametros.push(termo);
        }
        const conexao = await conectar();
        
        const [registros, campos] = await conexao.query(sql, parametros);
        let listaCliente=[];
        for (const registro of registros){
            const cliente = new Cliente(registro['codigo'],
                                        registro['nome'],  
                                        registro['email'],
                                        registro['cidade'],
                                        registro['estado'],
                                        registro['cpf']
            );
            listaCliente.push(cliente);
        }
        return listaCliente;
    }

}