import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CommentEntity } from "../../domain/entities/comment.entity";
import { CommentsRepository, CreateCommentInput, UpdateCommentInput } from "../../domain/repository-contracts/comments.repository";

function mapComment(comment: any): CommentEntity | null {
  if (!comment) return null;
  return {
    ...comment,
    author: comment.author
      ? {
          id: comment.author.id,
          firstName: comment.author.firstName,
          lastName: comment.author.lastName,
          email: comment.author.email,
          status: comment.author.status,
          lastLoginAt: comment.author.lastLoginAt,
          createdAt: comment.author.createdAt,
          updatedAt: comment.author.updatedAt,
          deletedAt: comment.author.deletedAt,
        }
      : undefined,
    statistics: comment.statistics
      ? {
          ...comment.statistics,
        }
      : undefined,
  } as CommentEntity;
}

@Injectable()
export class PrismaCommentsRepository implements CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private client(tx?: unknown) {
    return (tx as PrismaService) ?? this.prisma;
  }

  async create(input: CreateCommentInput, tx?: unknown): Promise<CommentEntity> {
    const comment = await this.client(tx).comment.create({
      data: {
        postId: input.postId,
        authorId: input.authorId,
        parentCommentId: input.parentCommentId ?? null,
        content: input.content,
      },
      include: { author: true, statistics: true },
    });
    return mapComment(comment)!;
  }

  async findById(id: string, tx?: unknown): Promise<CommentEntity | null> {
    const comment = await this.client(tx).comment.findUnique({
      where: { id },
      include: { author: true, statistics: true },
    });
    return mapComment(comment);
  }

  async findByPost(postId: string, tx?: unknown): Promise<CommentEntity[]> {
    const comments = await this.client(tx).comment.findMany({
      where: { postId },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      include: { author: true, statistics: true },
    });
    return comments.map((comment) => mapComment(comment)!).filter(Boolean);
  }

  async findReplies(parentCommentId: string, tx?: unknown): Promise<CommentEntity[]> {
    const comments = await this.client(tx).comment.findMany({
      where: { parentCommentId },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      include: { author: true, statistics: true },
    });
    return comments.map((comment) => mapComment(comment)!).filter(Boolean);
  }

  async update(id: string, input: UpdateCommentInput, tx?: unknown): Promise<CommentEntity> {
    const comment = await this.client(tx).comment.update({
      where: { id },
      data: {
        ...(input.content ? { content: input.content } : {}),
      },
      include: { author: true, statistics: true },
    });
    return mapComment(comment)!;
  }

  async delete(id: string, deletedAt: Date, tx?: unknown): Promise<void> {
    await this.client(tx).comment.update({
      where: { id },
      data: { deletedAt },
    });
  }
}
