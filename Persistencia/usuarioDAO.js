import Usuario from "../Modelo/usuario.js";
import conectar from "./Conexao.js";

export default class UsuarioDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuario(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    nomeUsuario VARCHAR(50) NOT NULL,
                    emailUsuario VARCHAR(100) NOT NULL,
                    senhaUsuario VARCHAR(50) NOT NULL,
                    tipoUsuario VARCHAR(20) NOT NULL,
                    CONSTRAINT pk_usuario PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela usuario!");
        }
    }

    async gravar(usuario){
        if (usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "INSERT INTO usuario(nomeUsuario,emailUsuario,senhaUsuario,tipoUsuario) VALUES (?,?,?,?)";
            const parametros = [usuario.nomeUsuario,
                                usuario.emailUsuario,
                                usuario.senhaUsuario,
                                usuario.tipoUsuario
            ];
            const resultado = await conexao.execute(sql,parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async editar(usuario){
        if (usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "UPDATE usuario SET nomeUsuario=?, emailUsuario=?, senhaUsuario=?, tipoUsuario=? WHERE codigo = ?";
            const parametros = [usuario.nomeUsuario,
                                usuario.emailUsuario,
                                usuario.senhaUsuario,
                                usuario.tipoUsuario,
                                usuario.codigo
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(usuario){
        if (usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = "DELETE FROM usuario WHERE codigo = ?";
            const parametros = [usuario.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = "SELECT * FROM usuario WHERE nomeUsuario LIKE ? ORDER BY nomeUsuario";
            parametros.push("%"+termo+"%");
        }
        else{
            sql = "SELECT * FROM usuario WHERE codigo = ? ORDER BY nomeUsuario";
            parametros.push(termo);
        }
        const conexao = await conectar();
        
        const [registros, campos] = await conexao.query(sql, parametros);
        let listaUsuario=[];
        for (const registro of registros){
            const usuario = new Usuario(registro['codigo'],
                                        registro['nomeUsuario'],  
                                        registro['emailUsuario'],
                                        registro['senhaUsuario'],
                                        registro['tipoUsuario'],
            );
            listaUsuario.push(usuario);
        }
        return listaUsuario;
    }

}