import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { StorageModule } from "../../infrastructure/storage/storage.module";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { MEDIA_REPOSITORY } from "./domain/repository-contracts/media.repository";
import { PrismaMediaRepository } from "./infrastructure/repositories/prisma-media.repository";
import { ImageUploadPolicy } from "./domain/policies/image-upload.policy";
import { MediaOwnershipPolicy } from "./domain/policies/media-ownership.policy";
import { UploadMediaService } from "./application/services/upload-media.service";
import { MediaController } from "./presentation/controllers/media.controller";

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
  controllers: [MediaController],
  providers: [
    {
      provide: MEDIA_REPOSITORY,
      useClass: PrismaMediaRepository,
    },
    UploadMediaService,
    ImageUploadPolicy,
    MediaOwnershipPolicy,
    JwtAuthGuard,
  ],
  exports: [MEDIA_REPOSITORY],
})
export class MediaModule {}
