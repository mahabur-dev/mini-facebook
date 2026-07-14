import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "./infrastructure/cache/cache.module";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { StorageModule } from "./infrastructure/storage/storage.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { HealthModule } from "./modules/health/health.module";
import { UsersModule } from "./modules/users/users.module";
import { PostsModule } from "./modules/posts/posts.module";
import { FeedModule } from "./modules/feed/feed.module";
import { MediaModule } from "./modules/media/media.module";
import { CommentsModule } from "./modules/comments/comments.module";
import { ReactionsModule } from "./modules/reactions/reactions.module";
import { validateEnvironment } from "./config/environment.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnvironment,
    }),
    DatabaseModule,
    CacheModule,
    StorageModule,
    HealthModule,
    AuthenticationModule,
    UsersModule,
    PostsModule,
    FeedModule,
    MediaModule,
    CommentsModule,
    ReactionsModule,
  ],
})
export class AppModule {}
