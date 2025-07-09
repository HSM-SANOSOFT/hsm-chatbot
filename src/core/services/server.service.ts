import type { ServerInterface } from '../interfaces';

export class ServerService implements ServerInterface {
  constructor(public readonly adapters: ServerInterface[]) {}

  start<T>(): Promise<T> {
    this.adapters.forEach(adapter => adapter.restart());
  }

  stop(): void {
    this.adapters.forEach(adapter => adapter.stop());
  }

  restart(): void {
    this.adapters.forEach(adapter => adapter.restart());
  }
  onRequest<T>(): Promise<T> {
    return Promise.all(
      this.adapters.map(adapter => adapter.onRequest<T>()),
    ).then(results => results[0]);
  }
}
