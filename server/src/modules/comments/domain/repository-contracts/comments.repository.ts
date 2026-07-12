import { CommentEntity } from "../entities/comment.entity";

export interface CreateCommentInput {
  postId: string;
  authorId: string;
  parentCommentId?: string | null;
  content: string;
}

export interface UpdateCommentInput {
  content?: string;
}

export interface CommentsRepository {
  create(input: CreateCommentInput, tx?: unknown): Promise<CommentEntity>;
  findById(id: string, tx?: unknown): Promise<CommentEntity | null>;
  findByPost(postId: string, tx?: unknown): Promise<CommentEntity[]>;
  findReplies(parentCommentId: string, tx?: unknown): Promise<CommentEntity[]>;
  update(id: string, input: UpdateCommentInput, tx?: unknown): Promise<CommentEntity>;
  delete(id: string, deletedAt: Date, tx?: unknown): Promise<void>;
}

export const COMMENTS_REPOSITORY = Symbol("COMMENTS_REPOSITORY");
