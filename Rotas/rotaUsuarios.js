//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl.js";

const userCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", userCtrl.gravar);
rotaUsuario.put("/:codigo", userCtrl.editar);
rotaUsuario.patch("/:codigo", userCtrl.editar);
rotaUsuario.delete("/:codigo", userCtrl.excluir);
rotaUsuario.get("/:codigo", userCtrl.consultar);
rotaUsuario.get("/",userCtrl.consultar);

export default rotaUsuario;