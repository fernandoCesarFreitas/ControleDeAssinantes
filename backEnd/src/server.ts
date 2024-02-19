import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import usuariosRoutes from './routes/usuarios'
import autenticacaoRoutes from './routes/autenticacao'
import assinantesRoutes from './routes/assinantes';
import { basicAuth } from "./middlewares/basics-auth";

let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(express.json());

// Middleware para logs
server.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[' + (new Date) + ']' + req.method + ' ' + req.url);
  next();
});

// Rotas
server.use(autenticacaoRoutes);
server.use(usuariosRoutes);
server.use(assinantesRoutes);

export default {
  start() {
    server.listen(port, () => {
      console.log(`servidor iniciado na porta ${port}`);
    });
  },
};