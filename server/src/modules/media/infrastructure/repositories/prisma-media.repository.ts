import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateMediaInput, MediaRepository } from "../../domain/repository-contracts/media.repository";
import { MediaEntity } from "../../domain/entities/media.entity";

function mapMedia(media: any): MediaEntity | null {
  return media
    ? ({
        ...media,
        fileUrl: media.imageUrl,
        fileSize: media.fileSize,
      } as MediaEntity)
    : null;
}

@Injectable()
export class PrismaMediaRepository implements MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  private client(tx?: unknown) {
    return (tx as PrismaService) ?? this.prisma;
  }

  async create(input: CreateMediaInput, tx?: unknown): Promise<MediaEntity> {
    const media = await this.client(tx).postMedia.create({
      data: {
        ownerId: input.ownerId,
        imageUrl: input.fileUrl,
        storageKey: input.storageKey,
        mimeType: input.mimeType,
        fileSize: input.fileSize,
        width: input.width ?? null,
        height: input.height ?? null,
      },
    });
    return mapMedia(media)!;
  }

  async findById(id: string, tx?: unknown): Promise<MediaEntity | null> {
    const media = await this.client(tx).postMedia.findUnique({ where: { id } });
    return mapMedia(media);
  }

  async findByStorageKey(storageKey: string, tx?: unknown): Promise<MediaEntity | null> {
    const media = await this.client(tx).postMedia.findUnique({ where: { storageKey } });
    return mapMedia(media);
  }

  async attachToPost(mediaId: string, postId: string, tx?: unknown): Promise<void> {
    await this.client(tx).postMedia.update({
      where: { id: mediaId },
      data: { postId },
    });
  }

  async delete(id: string, deletedAt: Date, tx?: unknown): Promise<void> {
    await this.client(tx).postMedia.update({ where: { id }, data: { deletedAt } });
  }
}
