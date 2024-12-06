import Fornecedor from "../Modelo/fornecedor.js";
import Categoria from "../Modelo/categoria.js";
import conectar from "./Conexao.js";

export default class FornecedorDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedor(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(50) NOT NULL,
                    fk_codigo_cat INT NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    cidade VARCHAR(50) NOT NULL,
                    estado VARCHAR(20) NOT NULL,
                    cnpj VARCHAR(20) NOT NULL,
                    CONSTRAINT pk_fornecedor PRIMARY KEY(codigo),
                    CONSTRAINT fk_categoria2 FOREIGN KEY(fk_codigo_cat) REFERENCES categoria(codigo) 
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela fornecedor!");
        }
    }

    async gravar(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "INSERT INTO fornecedor(nome,fk_codigo_cat,email,cidade,estado,cnpj) VALUES (?,?,?,?,?,?)";
            const parametros = [fornecedor.nome,
                                fornecedor.categoria.codigo,
                                fornecedor.email,
                                fornecedor.cidade,
                                fornecedor.estado,
                                fornecedor.cnpj
            ];
            const resultado = await conexao.execute(sql,parametros);
            fornecedor.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async editar(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "UPDATE fornecedor SET nome=?, fk_codigo_cat=?, email=?, cidade=?, estado=?, cnpj=? WHERE codigo = ?";
            const parametros = [fornecedor.nome,
                                fornecedor.categoria.codigo,
                                fornecedor.email,
                                fornecedor.cidade,
                                fornecedor.estado,
                                fornecedor.cnpj,
                                fornecedor.codigo
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(fornecedor){
        if (fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = "DELETE FROM fornecedor WHERE codigo = ?";
            const parametros = [fornecedor.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM fornecedor f
                   INNER JOIN categoria c ON f.fk_codigo_cat = c.codigo
                   WHERE nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM fornecedor f
                   INNER JOIN categoria c ON f.fk_codigo_cat = c.codigo 
                   WHERE codigo = ?`
            parametros = [termo];
        }
        const conexao = await conectar();
        
        const [linhas, campos] = await conexao.query(sql, parametros);
        let listaFornecedor = [];
        for (const linha of linhas) {
            const categoria = new Categoria(linha['codigo'],linha["descricao"]);    
            const fornecedor = new Fornecedor(
                linha['codigo'],
                linha['nome'],
                categoria,
                linha['email'],
                linha['cidade'],
                linha['estado'],
                linha['cnpj']
            );
            listaFornecedor.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedor;
    }
}