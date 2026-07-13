import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { StorageModule } from "../../infrastructure/storage/storage.module";
import { UsersController } from "./presentation/controllers/users.controller";
import { UpdateCurrentUserService } from "./application/services/update-current-user.service";
import { UpdateCurrentUserAvatarService } from "./application/services/update-current-user-avatar.service";

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
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
  controllers: [UsersController],
  providers: [UpdateCurrentUserService, UpdateCurrentUserAvatarService, JwtAuthGuard],
})
export class UsersModule {}
