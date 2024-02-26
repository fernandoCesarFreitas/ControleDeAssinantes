import { Assinantes } from './../models/Assinantes';
import { Request, Response } from "express";
import * as fs from 'fs';
import * as fileUpload from 'express-fileupload';

export class AssinantesController {

  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;
    let assinantes: Assinantes[] = await Assinantes.find({
      where: { status: true },
      order: { ordemEntrega: "ASC" },
    });
    return res.status(200).json(assinantes);
  }

  async listByUser(req: Request, res: Response): Promise<Response> {
    let userId = Number(req.params.id); 
    let assinantes: Assinantes[] = await Assinantes.find({
      where: { status: true, usuario_id: userId }, 
      order: { ordemEntrega: "ASC" },
    });
    return res.status(200).json(assinantes);
  }


  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; 

    let assinante: Assinantes = await Assinantes.create({
      codigo: body.codigo,
      nome: body.nome,
      rua: body.rua,
      numero: body.numero,
      bairro: body.bairro,
      cidade: body.cidade,
      tipo: body.tipo,
      descricao: body.descricao,
      coordenadas: body.coordenadas,
      ordemEntrega: parseInt(body.ordem),
      status: true,
      usuario_id: body.entregador,
      imagem: body.imagem,
    }).save(); 


    return res.status(200).json(assinante); 
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let assinante: Assinantes = res.locals.assinante;
    
    if (!assinante) {
      return res.status(400).json({ mensagem: "Assinante não encontrado" });
    }
    console.table (body)
    let imagem = body.imagem;
    let nome = body.nome;
    let codigo = body.codigo;
    let rua = body.rua;
    let numero = body.numero;
    let bairro = body.bairro;
    let cidade = body.cidade;
    let tipo = body.tipo;
    let descricao = body.descricao;
    let coordenadas = body.coordenadas;
    let ordem = body.ordem;
    let usuario_id = body.entregador;
    let status = true;
    console.log('assinante com valores antigos',assinante)
    
    assinante.codigo = codigo;
    assinante.nome = nome;
    assinante.rua = rua,
    assinante.numero = numero,
    assinante.bairro = bairro;
    assinante.cidade = cidade;
    assinante.tipo = tipo;
    assinante.descricao = descricao;
    assinante.coordenadas = coordenadas;
    assinante.ordemEntrega = ordem;
    assinante.status = true;
    assinante.usuario.id = usuario_id;
    assinante.imagem = imagem;
    
    await assinante.save();
    console.log('assinante com novos valores',assinante)

    return res.status(200).json(assinante);
  }



  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let assinante: Assinantes = res.locals.assinante;
    assinante.status = false;
    await assinante.save();
    return res.status(200).json(assinante);
  }



  async find(req: Request, res: Response): Promise<Response> {
    let assinante: Assinantes = res.locals.assinante;
    return res.status(200).json(assinante);
  }





  async gerarCSVAssinantes(req: Request, res: Response): Promise<void> {
    try {
      const assinantes: Assinantes[] = await Assinantes.find(); 

      if (assinantes.length === 0) {
        res.status(404).json({ mensagem: "Nenhum evento encontrado." });
      }

      let csv = '"ID";"Nome";"Data de Início";"Data de Fim";"status"\n';

      for (const assinante of assinantes) {
        csv += `"${assinante.id}";"${assinante.nome}";"${assinante.rua}";"${assinante.numero}";"${assinante.status}"\n`;
      }

      // Envie o arquivo CSV como resposta
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=assinantes.csv");
      res.status(200).send(csv);
    } catch (error) {
      console.error("Erro ao gerar o arquivo CSV de eventos:", error);
      res
        .status(500)
        .json({ mensagem: "Erro ao gerar o arquivo CSV de eventos." });
    }
  }
}

