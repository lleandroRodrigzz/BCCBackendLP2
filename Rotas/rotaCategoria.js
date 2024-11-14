//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import CategoriaCtrl from "../Controle/categoriaCtrl.js";

const catCtrl = new CategoriaCtrl();
const rotaCategoria = Router();

rotaCategoria.post("/", catCtrl.gravar);
rotaCategoria.put("/:id", catCtrl.editar);
rotaCategoria.patch("/:id", catCtrl.editar);
rotaCategoria.delete("/:id", catCtrl.excluir);
rotaCategoria.get("/:id", catCtrl.consultar);
rotaCategoria.get("/",catCtrl.consultar);

export default rotaCategoria;


