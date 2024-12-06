//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import FornecedorCtrl from "../Controle/fornecedorCtrl.js";

const forneCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", forneCtrl.gravar);
rotaFornecedor.put("/:codigo", forneCtrl.editar);
rotaFornecedor.patch("/:codigo", forneCtrl.editar);
rotaFornecedor.delete("/:codigo", forneCtrl.excluir);
rotaFornecedor.get("/:codigo", forneCtrl.consultar);
rotaFornecedor.get("/",forneCtrl.consultar);

export default rotaFornecedor;