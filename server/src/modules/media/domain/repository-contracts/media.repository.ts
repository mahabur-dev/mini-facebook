import { MediaEntity } from "../entities/media.entity";

export interface CreateMediaInput {
  ownerId: string;
  fileUrl: string;
  storageKey: string;
  mimeType: string;
  fileSize: bigint;
  width?: number | null;
  height?: number | null;
}

export interface MediaRepository {
  create(input: CreateMediaInput, tx?: unknown): Promise<MediaEntity>;
  findById(id: string, tx?: unknown): Promise<MediaEntity | null>;
  findByStorageKey(storageKey: string, tx?: unknown): Promise<MediaEntity | null>;
  attachToPost(mediaId: string, postId: string, tx?: unknown): Promise<void>;
  delete(id: string, deletedAt: Date, tx?: unknown): Promise<void>;
}

export const MEDIA_REPOSITORY = Symbol("MEDIA_REPOSITORY");
