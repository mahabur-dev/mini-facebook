import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { SessionsModule } from "../sessions/sessions.module";
import { AuthenticationController } from "./presentation/controllers/authentication.controller";
import { RegisterUserService } from "./application/services/register-user.service";
import { LoginUserService } from "./application/services/login-user.service";
import { RefreshSessionService } from "./application/services/refresh-session.service";
import { LogoutSessionService } from "./application/services/logout-session.service";
import { GetCurrentUserService } from "./application/services/get-current-user.service";
import { PrismaUsersRepository } from "./infrastructure/repositories/prisma-users.repository";
import { RegistrationPolicy } from "./domain/policies/registration.policy";
import { LoginPolicy } from "./domain/policies/login.policy";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { USERS_REPOSITORY } from "./domain/repository-contracts/users.repository";

@Module({
  imports: [
    DatabaseModule,
    SessionsModule,
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
    RegisterUserService,
    LoginUserService,
    RefreshSessionService,
    LogoutSessionService,
    GetCurrentUserService,
    RegistrationPolicy,
    LoginPolicy,
    JwtAuthGuard,
  ],
  exports: [RegisterUserService, LoginUserService, RefreshSessionService, LogoutSessionService, GetCurrentUserService],
})
export class AuthenticationModule {}
