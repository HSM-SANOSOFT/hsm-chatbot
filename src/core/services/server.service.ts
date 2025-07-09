import type { ServerInterface } from '../interfaces';

export class ServerService implements ServerInterface {
  constructor(private readonly adapters: ServerInterface[]) {}
  async start(): Promise<void> {
    await Promise.all(this.adapters.map(a => a.start()));
  }

  onRequest<T>(): Promise<T> {
    return Promise.race(this.adapters.map(a => a.onRequest<T>()));
  }

  stop(): void {
    this.adapters.forEach(a => a.stop());
  }

  async restart(): Promise<void> {
    this.stop();
    await this.start();
  }
}
