import express, { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import * as yup from "yup";
import { AssinantesController } from "../controller/AssinantesController";
import { Assinantes } from "../models/Assinantes";
let assinanteController: AssinantesController = new AssinantesController();

const app = express();

async function validarPayload(req, res, next) {
  let schema = yup.object({
    codigo: yup.string().min(1).max(255).required(),
    nome: yup.string().min(3).max(255).required(),
    rua: yup.string().min(3).max(255).required(),
    numero: yup.string().min(1).max(11).required(),
    bairro: yup.string().min(3).max(255).required(),
    cidade: yup.string().min(1).max(255).required(),
    ordem: yup.string().min(1).max(11),
    coordenadas: yup.string().min(1).max(255).required(),
    tipo: yup.string().min(1).max(255).required(),
    entregador: yup.string().min(1).required(),
    descricao: yup.string().min(1).max(400),
    imagem: yup.string(),
  });

  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    console.log(req.body);

    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ erros: error.errors });
    }
    return res.status(500).json({ error: "Ops" });
  }
}

async function validar(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let id = Number(req.params.id);

  let assinante: Assinantes | null = await Assinantes.findOneBy({ id });

  if (!assinante) {
    return res.status(422).json({ error: "Assinante não encontrado" });
  }
  res.locals.assinante = assinante;

  return next();
}

let rotas: Router = Router();
//listar
rotas.get("/Assinantes", assinanteController.list);
//visualizar 1 usuario pelo id
rotas.get("/assinantes/:id", validar, assinanteController.find);
//criar
rotas.post("/assinantes", validarPayload, assinanteController.create);
//atualizar
rotas.put(
  "/assinantes/:id",
  validar,
  validarPayload,
  assinanteController.update
);
//delete
rotas.delete("/assinantes/:id", validar, assinanteController.delete);

rotas.get("/assinantesPorEntregador/:id", assinanteController.listByUser);

export default rotas;