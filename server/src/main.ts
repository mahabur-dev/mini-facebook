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
    origin: createCorsOriginValidator(configService, port),
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

function createCorsOriginValidator(configService: ConfigService, port: number) {
  const configuredOrigins =
    configService
      .get<string>("CLIENT_ORIGINS")
      ?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [];

  const allowedOrigins = new Set([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    `http://localhost:${port}`,
    ...configuredOrigins,
  ]);

  return (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`), false);
  };
}

void bootstrap();
