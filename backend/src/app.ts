import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import router from './routes';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';
import { PORT, DB_ADDRESS, ORIGIN_ALLOW } from './config';

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(cors({ origin: ORIGIN_ALLOW, credentials: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(requestLogger);

app.use(router);

// 404 — используем _req, чтобы не ругался линтер
app.use((_req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
