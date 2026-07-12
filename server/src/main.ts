import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>("PORT") ?? 4000);
  const appUrl = configService.get<string>("APP_URL") ?? `http://localhost:${port}`;
  const nodeEnv = configService.get<string>("NODE_ENV") ?? "development";

  app.setGlobalPrefix("api/v1");
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: [appUrl, "http://localhost:3000"],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Mini Facebook API")
    .setDescription("Backend API for the mini Facebook assignment")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document);

  await app.listen(port);
  if (nodeEnv !== "production") {
    // eslint-disable-next-line no-console
    console.log(`API listening on ${appUrl}`);
  }
}

void bootstrap();
