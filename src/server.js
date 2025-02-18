import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnv } from './utils/getEnv.js';
import { ENV_VARS } from './constants/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.get('/', async (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Hi, it`s working!!!😁',
    });
  });

  const PORT = getEnv(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
};
