import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcrypt";

export class AutenticacaoController {
  
  async login(req: Request, res: Response): Promise<Response> {
    let email: string = req.body.email;
    let senha: string = req.body.senha;
    email = email.toUpperCase();
    console.log(email, senha+"cheguei aki");

    let usuario: Usuario | null = await Usuario.findOne({
      where: { email: email }, 
      select: ["id", "email", "nome", "senha"], 
    });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Dados não encontrados!" });
    }
    console.log(usuario.senha, senha);
    let resultado = await bcrypt.compare(senha, usuario.senha);

    if (!resultado) {
      return res.status(401).json({ mensagem: "Senha inválida!" }); 
    }
    let token: string = Buffer.from(`${email}:${senha}`).toString("base64");

    const { senha: senhaUsuario, ...userWithoutPassword } = usuario;
    return res.status(200).json({ token, type: "Basic", usuario: userWithoutPassword });
  }
}