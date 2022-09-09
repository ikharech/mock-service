import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';
import chalk from 'chalk';

class Server {
  async bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.setGlobalPrefix('rest/api');
    app.use(
      express.json({
        limit: `${process.env.SERVER_MAX_JSON_BODY_SIZE || 2}MB`,
      }),
    );

    const configService: AppConfigService = app.get(AppConfigService);
    const port = configService.port;
    await app.listen(port, () => {
      console.log(`${chalk.green('Server started')} on port: ${port}`);
    });
  }
}

export { Server };
