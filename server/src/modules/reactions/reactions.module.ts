import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { PostsModule } from "../posts/posts.module";
import { CommentsModule } from "../comments/comments.module";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ReactionsController } from "./presentation/controllers/reactions.controller";
import { PostLikePolicy } from "./domain/policies/post-like.policy";
import { CommentLikePolicy } from "./domain/policies/comment-like.policy";
import { UnlikePolicy } from "./domain/policies/unlike.policy";
import { LikerListPolicy } from "./domain/policies/liker-list.policy";
import { PostLikeService } from "./application/services/post-like.service";
import { PostUnlikeService } from "./application/services/post-unlike.service";
import { GetPostLikersService } from "./application/services/get-post-likers.service";
import { CommentLikeService } from "./application/services/comment-like.service";
import { CommentUnlikeService } from "./application/services/comment-unlike.service";
import { GetCommentLikersService } from "./application/services/get-comment-likers.service";

@Module({
  imports: [
    DatabaseModule,
    PostsModule,
    CommentsModule,
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
  controllers: [ReactionsController],
  providers: [
    JwtAuthGuard,
    PostLikePolicy,
    CommentLikePolicy,
    UnlikePolicy,
    LikerListPolicy,
    PostLikeService,
    PostUnlikeService,
    GetPostLikersService,
    CommentLikeService,
    CommentUnlikeService,
    GetCommentLikersService,
  ],
})
export class ReactionsModule {}
