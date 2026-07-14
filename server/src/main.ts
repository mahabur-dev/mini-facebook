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
  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: "Mini Facebook API Docs",
    customCss: createSwaggerThemeCss(),
    customJsStr: createSwaggerThemeScript(),
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });

  await app.listen(port);
  if (nodeEnv !== "production") {
    // eslint-disable-next-line no-console
    console.log(`API listening on ${appUrl}`);
  }
}

function createSwaggerThemeCss() {
  return `
    html[data-swagger-theme="light"] {
      color-scheme: light;
      --swagger-bg: #ffffff;
      --swagger-panel: #ffffff;
      --swagger-text: #1f2937;
      --swagger-muted: #6b7280;
      --swagger-line: #e5e7eb;
      --swagger-accent: #0f766e;
      --swagger-code-bg: #111827;
    }

    html[data-swagger-theme="dark"] {
      color-scheme: dark;
      --swagger-bg: #0f1419;
      --swagger-panel: #151b22;
      --swagger-text: #f3f4f6;
      --swagger-muted: #a7b0bd;
      --swagger-line: #27313d;
      --swagger-accent: #5eead4;
      --swagger-code-bg: #020617;
    }

    html:not([data-swagger-theme]) {
      color-scheme: dark;
      --swagger-bg: #0f1419;
      --swagger-panel: #151b22;
      --swagger-text: #f3f4f6;
      --swagger-muted: #a7b0bd;
      --swagger-line: #27313d;
      --swagger-accent: #5eead4;
      --swagger-code-bg: #020617;
    }

    body,
    .swagger-ui {
      background: var(--swagger-bg);
      color: var(--swagger-text);
      font-family: "Segoe UI", sans-serif;
    }

    .swagger-ui .topbar {
      background: var(--swagger-panel);
      border-bottom: 1px solid var(--swagger-line);
      box-shadow: none;
    }

    .swagger-ui .topbar .wrapper {
      align-items: center;
      display: flex;
      gap: 1rem;
    }

    .swagger-theme-toggle {
      align-items: center;
      background: transparent;
      border: 0;
      color: var(--swagger-text);
      cursor: pointer;
      display: inline-flex;
      font-size: 13px;
      font-weight: 700;
      gap: 0.5rem;
      margin-left: auto;
      padding: 0.5rem 0;
      transition: color 160ms ease;
    }

    .swagger-theme-toggle:hover {
      color: var(--swagger-accent);
    }

    .swagger-theme-toggle__icon {
      background: var(--swagger-accent);
      border-radius: 999px;
      display: inline-block;
      height: 0.75rem;
      width: 0.75rem;
    }

    .swagger-ui .info,
    .swagger-ui .scheme-container,
    .swagger-ui .opblock,
    .swagger-ui .model-box,
    .swagger-ui section.models {
      background: var(--swagger-panel);
      border-color: transparent;
      border-radius: 0;
      box-shadow: none;
    }

    .swagger-ui .wrapper {
      max-width: 1420px;
    }

    .swagger-ui .info {
      margin: 2rem 0;
      padding: 0;
    }

    .swagger-ui .scheme-container {
      margin: 0 0 1.5rem;
      padding: 1rem 0;
      border-top: 1px solid var(--swagger-line);
      border-bottom: 1px solid var(--swagger-line);
    }

    .swagger-ui .opblock {
      margin: 0 0 0.75rem;
    }

    .swagger-ui .opblock-tag {
      border-bottom-color: var(--swagger-line) !important;
      padding: 1.25rem 0 0.75rem;
    }

    .swagger-ui .info .title,
    .swagger-ui .info p,
    .swagger-ui .opblock-tag,
    .swagger-ui .opblock .opblock-summary-path,
    .swagger-ui .opblock .opblock-summary-description,
    .swagger-ui .parameter__name,
    .swagger-ui .parameter__type,
    .swagger-ui table thead tr td,
    .swagger-ui table thead tr th,
    .swagger-ui .response-col_status,
    .swagger-ui .response-col_description,
    .swagger-ui .model-title,
    .swagger-ui .model,
    .swagger-ui .model-toggle,
    .swagger-ui .prop-type,
    .swagger-ui .tab li,
    .swagger-ui label,
    .swagger-ui p,
    .swagger-ui h1,
    .swagger-ui h2,
    .swagger-ui h3,
    .swagger-ui h4,
    .swagger-ui h5 {
      color: var(--swagger-text) !important;
    }

    .swagger-ui .info .title small,
    .swagger-ui .parameter__in,
    .swagger-ui .opblock-description-wrapper p,
    .swagger-ui .markdown p {
      color: var(--swagger-muted) !important;
    }

    .swagger-ui .btn,
    .swagger-ui .authorize,
    .swagger-ui .try-out__btn,
    .swagger-ui .execute {
      border-color: var(--swagger-accent) !important;
      color: var(--swagger-accent) !important;
      border-radius: 4px;
    }

    .swagger-ui .execute {
      background: var(--swagger-accent) !important;
      color: #06211e !important;
    }

    .swagger-ui input,
    .swagger-ui textarea,
    .swagger-ui select {
      background: var(--swagger-panel) !important;
      border-color: var(--swagger-line) !important;
      color: var(--swagger-text) !important;
      border-radius: 4px;
    }

    .swagger-ui code,
    .swagger-ui pre,
    .swagger-ui .microlight {
      background: var(--swagger-code-bg) !important;
      color: #e5eef9 !important;
      border-radius: 4px;
    }
  `;
}

function createSwaggerThemeScript() {
  return `
    (function () {
      var storageKey = "swagger-theme";
      var root = document.documentElement;

      function getPreferredTheme() {
        var savedTheme = window.localStorage.getItem(storageKey);

        if (savedTheme === "light" || savedTheme === "dark") {
          return savedTheme;
        }

        return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
      }

      function applyTheme(theme) {
        root.setAttribute("data-swagger-theme", theme);

        var label = document.querySelector("[data-swagger-theme-label]");
        if (label) {
          label.textContent = theme === "dark" ? "Dark" : "Light";
        }

        var button = document.querySelector("[data-swagger-theme-toggle]");
        if (button) {
          button.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
          button.setAttribute("title", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
        }
      }

      function createThemeToggle() {
        if (document.querySelector("[data-swagger-theme-toggle]")) {
          return;
        }

        var topbarWrapper = document.querySelector(".swagger-ui .topbar .wrapper");
        if (!topbarWrapper) {
          window.setTimeout(createThemeToggle, 100);
          return;
        }

        var button = document.createElement("button");
        button.type = "button";
        button.className = "swagger-theme-toggle";
        button.setAttribute("data-swagger-theme-toggle", "true");
        button.innerHTML = '<span class="swagger-theme-toggle__icon" aria-hidden="true"></span><span>Theme: </span><span data-swagger-theme-label></span>';
        button.addEventListener("click", function () {
          var nextTheme = root.getAttribute("data-swagger-theme") === "dark" ? "light" : "dark";
          window.localStorage.setItem(storageKey, nextTheme);
          applyTheme(nextTheme);
        });

        topbarWrapper.appendChild(button);
        applyTheme(root.getAttribute("data-swagger-theme") || getPreferredTheme());
      }

      applyTheme(getPreferredTheme());
      createThemeToggle();
    })();
  `;
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
    "https://mini-facebook-ochre.vercel.app",
    "https://mini-facebook-git-main-mahabur1814031-8144s-projects.vercel.app",
    "https://mini-facebook-production.up.railway.app"
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
