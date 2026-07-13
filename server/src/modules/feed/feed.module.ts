import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { PostsModule } from "../posts/posts.module";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { FEED_REPOSITORY } from "./domain/repository-contracts/feed.repository";
import { PrismaFeedRepository } from "./infrastructure/repositories/prisma-feed.repository";
import { GetFeedService } from "./application/services/get-feed.service";
import { FeedController } from "./presentation/controllers/feed.controller";

@Module({
  imports: [
    DatabaseModule,
    PostsModule,
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
  controllers: [FeedController],
  providers: [
    {
      provide: FEED_REPOSITORY,
      useClass: PrismaFeedRepository,
    },
    GetFeedService,
    JwtAuthGuard,
  ],
})
export class FeedModule {}
