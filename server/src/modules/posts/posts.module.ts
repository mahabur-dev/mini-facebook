import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { MediaModule } from "../media/media.module";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { PostsController } from "./presentation/controllers/posts.controller";
import { POSTS_REPOSITORY } from "./domain/repository-contracts/posts.repository";
import { PrismaPostsRepository } from "./infrastructure/repositories/prisma-posts.repository";
import { CreatePostService } from "./application/services/create-post.service";
import { GetPostService } from "./application/services/get-post.service";
import { UpdatePostService } from "./application/services/update-post.service";
import { DeletePostService } from "./application/services/delete-post.service";
import { PostCreationPolicy } from "./domain/policies/post-creation.policy";
import { PostVisibilityPolicy } from "./domain/policies/post-visibility.policy";
import { PostOwnershipPolicy } from "./domain/policies/post-ownership.policy";
import { PostDeletionPolicy } from "./domain/policies/post-deletion.policy";
import { PostInteractionPolicy } from "./domain/policies/post-interaction.policy";
import { MediaAttachmentPolicy } from "./domain/policies/media-attachment.policy";

@Module({
  imports: [
    DatabaseModule,
    MediaModule,
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
  controllers: [PostsController],
  providers: [
    {
      provide: POSTS_REPOSITORY,
      useClass: PrismaPostsRepository,
    },
    CreatePostService,
    GetPostService,
    UpdatePostService,
    DeletePostService,
    PostCreationPolicy,
    PostVisibilityPolicy,
    PostOwnershipPolicy,
    PostDeletionPolicy,
    PostInteractionPolicy,
    MediaAttachmentPolicy,
    JwtAuthGuard,
  ],
  exports: [POSTS_REPOSITORY, PostVisibilityPolicy],
})
export class PostsModule {}
