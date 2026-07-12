import { PostEntity } from "../entities/post.entity";
import { PostVisibility } from "../enums/post-visibility.enum";

export interface CreatePostInput {
  authorId: string;
  content?: string | null;
  visibility: PostVisibility;
}

export interface UpdatePostInput {
  content?: string | null;
  visibility?: PostVisibility;
}

export interface PostsRepository {
  create(input: CreatePostInput, tx?: unknown): Promise<PostEntity>;
  findById(id: string, tx?: unknown): Promise<PostEntity | null>;
  update(id: string, input: UpdatePostInput, tx?: unknown): Promise<PostEntity>;
  delete(id: string, deletedAt: Date, tx?: unknown): Promise<void>;
}

export const POSTS_REPOSITORY = Symbol("POSTS_REPOSITORY");
