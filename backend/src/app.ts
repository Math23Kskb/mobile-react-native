import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// importar a(s) rota(s) do nosso arquivo index.ts que está em routes/index.ts
import routes from './routes/index';
//importar o errorHandler.ts que criamos para tratar erros.
import { errorHandler } from './middlewares/errorHandler';

export const app = express(); //
app.use(cors()); //
app.use(express.json()); // 
app.use(morgan('dev')); //
app.use(routes); //
//O arquivo que trata erros deve vir por ultimo, para capturar exceções das rotas
app.use(errorHandler);


