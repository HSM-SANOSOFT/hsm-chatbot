import { App } from './modules/app';

async function bootstrap() {
  const app = new App();

  app.create();
  await app.listen(3000);
}

void bootstrap();
