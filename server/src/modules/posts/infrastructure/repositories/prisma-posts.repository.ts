import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreatePostInput, PostsRepository, UpdatePostInput } from "../../domain/repository-contracts/posts.repository";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";

function mapPost(post: any): PostEntity | null {
  if (!post) return null;

  return {
    ...post,
    visibility: post.visibility as PostVisibility,
    author: post.author
      ? {
          id: post.author.id,
          firstName: post.author.firstName,
          lastName: post.author.lastName,
          email: post.author.email,
          status: post.author.status,
          lastLoginAt: post.author.lastLoginAt,
          createdAt: post.author.createdAt,
          updatedAt: post.author.updatedAt,
          deletedAt: post.author.deletedAt,
        }
      : undefined,
    statistics: post.statistics
      ? {
          ...post.statistics,
        }
      : undefined,
    media: post.media
      ? {
          ...post.media,
          fileSize: post.media.fileSize,
        }
      : null,
  } as PostEntity;
}

@Injectable()
export class PrismaPostsRepository implements PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private client(tx?: unknown) {
    return (tx as PrismaService) ?? this.prisma;
  }

  async create(input: CreatePostInput, tx?: unknown): Promise<PostEntity> {
    const post = await this.client(tx).post.create({
      data: {
        authorId: input.authorId,
        content: input.content ?? null,
        visibility: input.visibility,
      },
      include: {
        author: true,
        media: true,
        statistics: true,
      },
    });
    return mapPost(post)!;
  }

  async findById(id: string, tx?: unknown): Promise<PostEntity | null> {
    const post = await this.client(tx).post.findUnique({
      where: { id },
      include: {
        author: true,
        media: true,
        statistics: true,
      },
    });
    return mapPost(post);
  }

  async update(id: string, input: UpdatePostInput, tx?: unknown): Promise<PostEntity> {
    const post = await this.client(tx).post.update({
      where: { id },
      data: {
        ...(input.content !== undefined ? { content: input.content } : {}),
        ...(input.visibility ? { visibility: input.visibility } : {}),
      },
      include: {
        author: true,
        media: true,
        statistics: true,
      },
    });
    return mapPost(post)!;
  }

  async delete(id: string, deletedAt: Date, tx?: unknown): Promise<void> {
    await this.client(tx).post.update({
      where: { id },
      data: { deletedAt },
    });
  }
}
