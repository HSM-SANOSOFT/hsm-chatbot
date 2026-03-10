import http from 'node:http';

import { Logger } from '@hsm-chatbot-lib/common/logger';
import { ChannelId } from '@hsm-chatbot-lib/definitions';
import cors, { CorsOptions } from 'cors';
import express, { Application, Request, Response } from 'express';
import { Handler } from '../handler/handler';

export interface AppOptions {
  cors?: boolean | CorsOptions;
}

export class App {
  private readonly server: Application;
  private readonly logger: Logger;
  private readonly options: AppOptions;
  private httpServer?: http.Server;
  private readonly handler: Handler;

  constructor(options: AppOptions = {}) {
    this.logger = new Logger('App');
    this.options = options;
    this.server = express();
    this.handler = new Handler();
  }

  create(): this {
    if (this.options.cors) {
      const corsOptions =
        typeof this.options.cors === 'boolean' ? {} : this.options.cors;
      this.server.use(cors(corsOptions));
    }

    this.server.use(express.json());

    this.registerRoutes();

    this.logger.info('Application created');
    return this;
  }

  listen(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpServer = this.server.listen(port, () => {
        this.logger.info(`Application listening on port ${port}`);
        resolve();
      });

      this.httpServer.on('error', err => {
        this.logger.error(`Error starting server: ${err.message}`);
        reject(err);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        resolve();
        return;
      }

      this.httpServer.close(err => {
        if (err) {
          this.logger.error(`Error closing server: ${err.message}`);
          reject(err);
        } else {
          this.logger.info('Server closed');
          resolve();
        }
      });
    });
  }

  private registerRoutes(): void {
    this.server.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ status: 'ok' });
    });

    // TODO: wire up agent router
    this.server.post(
      '/messages/:channel/:id',
      async (req: Request, res: Response) => {
        this.logger.debug(
          `Received message for channel ${req.params.channel} and id ${req.params.id}`,
        );
        const result = await this.handler.incomingMessage(
          req.params.channel as ChannelId,
          req.params.id as string,
          req.body,
        );
        res.json(result);
      },
    );
  }
}
