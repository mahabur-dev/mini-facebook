import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { MEDIA_REPOSITORY, MediaRepository } from "../../../media/domain/repository-contracts/media.repository";
import { MediaAttachmentPolicy } from "../../domain/policies/media-attachment.policy";
import { PostCreationPolicy } from "../../domain/policies/post-creation.policy";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";
import { POSTS_REPOSITORY, PostsRepository } from "../../domain/repository-contracts/posts.repository";
import { PostNotFoundException } from "../../domain/exceptions/post-not-found.exception";
import { PostResponse } from "../interfaces/post-response.interface";

@Injectable()
export class CreatePostService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(POSTS_REPOSITORY) private readonly postsRepository: PostsRepository,
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepository: MediaRepository,
    private readonly postCreationPolicy: PostCreationPolicy,
    private readonly mediaAttachmentPolicy: MediaAttachmentPolicy,
  ) {}

  async execute(input: { authorId: string; content?: string | null; visibility: PostVisibility; mediaId?: string | null }): Promise<PostResponse> {
    this.postCreationPolicy.canCreate(input);

    return this.prisma.$transaction(async (tx: any) => {
      const mediaId = input.mediaId?.trim() || null;

      if (mediaId) {
        const media = await this.mediaRepository.findById(mediaId, tx);
        this.mediaAttachmentPolicy.canAttach(input.authorId, media);
      }

      const post = await this.postsRepository.create(
        {
          authorId: input.authorId,
          content: input.content?.trim() || null,
          visibility: input.visibility,
        },
        tx,
      );

      await tx.postStatistics.create({
        data: {
          postId: post.id,
          likeCount: 0,
          commentCount: 0,
          replyCount: 0,
        },
      });

      if (mediaId) {
        await this.mediaRepository.attachToPost(mediaId, post.id, tx);
      }

      const created = await this.postsRepository.findById(post.id, tx);
      if (!created) {
        throw new PostNotFoundException();
      }

      return { post: created };
    });
  }
}
