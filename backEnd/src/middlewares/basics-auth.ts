import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcrypt";


export async function basicAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  
  console.log("cheguei aki", req.headers.authorization);
  let authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Credenciais nao informadas" });
  }

  let [type, token] = authorization.split(" ");

  if (!type || type != "Basic") {
    return res.status(401).json({ mensagem: "Tipo de autenticacao invalidos" });
  }

  let [email, senha] = Buffer.from(token, "base64").toString("utf8").split(":");

  let usuario: Usuario | null = await Usuario.findOne({
    where: { email: email }, //compara todos os email com o email digitado
    select: ["id", "email", "senha"], //busca mesmo que mande nao mostrar a nivel de db
  });
  if (!usuario) {
    // se nao encontrar nenhum
    return res.status(401).json({ mensagem: "Dados não encontrados!" });
  }
  let resultado = await bcrypt.compare(senha, usuario.senha); //substitui a função que estava usando

  if (!resultado) {
    return res.status(401).json({ mensagem: "Senha inválida!" }); // essas mensagens são usados no navegador
  }
  return next();
}
