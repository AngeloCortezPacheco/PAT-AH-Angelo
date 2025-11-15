const { NestFactory } = require('@nestjs/core');
const { Transport } = require('@nestjs/microservices');
const { AppModule } = require('./app.module');
const { Logger } = require('@nestjs/common');

async function bootstrap() {
  const logger = new Logger('AlertService');

  const app = await NestFactory.create(AppModule, {
    logger: {
      log: (msg) => logger.log(msg),
      error: (msg, trace) => logger.error(msg, trace),
      warn: (msg) => logger.warn(msg),
      debug: (msg) => logger.debug(msg),
      verbose: (msg) => logger.verbose(msg),
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`🚨 Alert Service is listening on port ${port}`);
}

bootstrap();