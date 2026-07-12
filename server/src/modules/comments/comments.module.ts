import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { PostsModule } from "../posts/posts.module";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { COMMENTS_REPOSITORY } from "./domain/repository-contracts/comments.repository";
import { PrismaCommentsRepository } from "./infrastructure/repositories/prisma-comments.repository";
import { CommentCreationPolicy } from "./domain/policies/comment-creation.policy";
import { ReplyCreationPolicy } from "./domain/policies/reply-creation.policy";
import { CommentOwnershipPolicy } from "./domain/policies/comment-ownership.policy";
import { CommentVisibilityPolicy } from "./domain/policies/comment-visibility.policy";
import { CommentDeletionPolicy } from "./domain/policies/comment-deletion.policy";
import { CreateCommentService } from "./application/services/create-comment.service";
import { GetCommentsService } from "./application/services/get-comments.service";
import { GetRepliesService } from "./application/services/get-replies.service";
import { UpdateCommentService } from "./application/services/update-comment.service";
import { DeleteCommentService } from "./application/services/delete-comment.service";
import { CommentsController } from "./presentation/controllers/comments.controller";
import { PostVisibilityPolicy } from "../posts/domain/policies/post-visibility.policy";

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
  controllers: [CommentsController],
  providers: [
    {
      provide: COMMENTS_REPOSITORY,
      useClass: PrismaCommentsRepository,
    },
    CreateCommentService,
    GetCommentsService,
    GetRepliesService,
    UpdateCommentService,
    DeleteCommentService,
    CommentCreationPolicy,
    ReplyCreationPolicy,
    CommentOwnershipPolicy,
    CommentVisibilityPolicy,
    CommentDeletionPolicy,
    PostVisibilityPolicy,
    JwtAuthGuard,
  ],
  exports: [COMMENTS_REPOSITORY, CommentVisibilityPolicy, CommentOwnershipPolicy],
})
export class CommentsModule {}
