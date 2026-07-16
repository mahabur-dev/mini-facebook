import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { swaggerThemeCss, swaggerThemeScript } from "./swagger-theme";

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const appName =
    configService.get<string>("APP_NAME") ?? "Mini Facebook API";

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(appName)
      .setDescription("Backend API for the Mini Facebook assignment")
      .setVersion("1.0.0")
      .addBearerAuth()
      .build(),
  );

  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: `${appName} Docs`,
    customCss: swaggerThemeCss,
    customJsStr: swaggerThemeScript,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });
}
