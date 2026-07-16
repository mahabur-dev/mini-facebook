import "reflect-metadata";

import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { setupSwagger } from "./common/swagger/setup-swagger";

const API_PREFIX = "api/v1";
const DEFAULT_PORT = 4000;
const DEFAULT_NODE_ENV = "development";
const allowedCorsHeaders = [
  "Authorization",
  "Cache-Control",
  "Content-Type",
  "Pragma",
  "X-Requested-With",
];
const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "https://mini-facebook-ochre.vercel.app",
  "https://mini-facebook-git-main-mahabur1814031-8144s-projects.vercel.app",
];

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>("PORT") ?? DEFAULT_PORT);
  const appUrl =
    configService.get<string>("APP_URL") ?? `http://localhost:${port}`;
  const nodeEnv = configService.get<string>("NODE_ENV") ?? DEFAULT_NODE_ENV;

  app.setGlobalPrefix(API_PREFIX);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "validator.swagger.io"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: createCorsOriginValidator(configService),
    credentials: true,
    allowedHeaders: allowedCorsHeaders,
    exposedHeaders: ["Content-Type"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app, configService);

  await app.listen(port, "0.0.0.0");

  if (nodeEnv !== "production") {
    console.log(`API listening on ${appUrl}`);
    console.log(`Swagger documentation: ${appUrl}/docs`);
  }
}

function createCorsOriginValidator(configService: ConfigService) {
  const configuredOrigins =
    configService
      .get<string>("CLIENT_ORIGINS")
      ?.split(",")
      .map((origin) => normalizeOrigin(origin))
      .filter(Boolean) ?? [];

  const allowedOrigins = new Set([
    ...defaultAllowedOrigins.map((origin) => normalizeOrigin(origin)),
    ...configuredOrigins,
  ]);

  return (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    const normalizedOrigin = normalizeOrigin(origin);

    if (!normalizedOrigin || allowedOrigins.has(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${normalizedOrigin}`), false);
  };
}

function normalizeOrigin(origin: string | undefined): string {
  return origin?.trim().replace(/\/$/, "") ?? "";
}

void bootstrap();
