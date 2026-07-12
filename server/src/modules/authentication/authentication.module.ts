import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { AuthenticationController } from "./presentation/controllers/authentication.controller";
import { RegisterUserService } from "./application/services/register-user.service";
import { LoginUserService } from "./application/services/login-user.service";
import { RefreshSessionService } from "./application/services/refresh-session.service";
import { LogoutSessionService } from "./application/services/logout-session.service";
import { GetCurrentUserService } from "./application/services/get-current-user.service";
import { PrismaUsersRepository } from "./infrastructure/repositories/prisma-users.repository";
import { PrismaSessionsRepository } from "./infrastructure/repositories/prisma-sessions.repository";
import { RegistrationPolicy } from "./domain/policies/registration.policy";
import { LoginPolicy } from "./domain/policies/login.policy";
import { SessionPolicy } from "./domain/policies/session.policy";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { USERS_REPOSITORY } from "./domain/repository-contracts/users.repository";
import { SESSIONS_REPOSITORY } from "./domain/repository-contracts/sessions.repository";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_ACCESS_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_ACCESS_EXPIRES_IN") ?? "15m",
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
    {
      provide: SESSIONS_REPOSITORY,
      useClass: PrismaSessionsRepository,
    },
    RegisterUserService,
    LoginUserService,
    RefreshSessionService,
    LogoutSessionService,
    GetCurrentUserService,
    RegistrationPolicy,
    LoginPolicy,
    SessionPolicy,
    JwtAuthGuard,
  ],
  exports: [RegisterUserService, LoginUserService, RefreshSessionService, LogoutSessionService, GetCurrentUserService],
})
export class AuthenticationModule {}
