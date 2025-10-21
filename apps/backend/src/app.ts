import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);


