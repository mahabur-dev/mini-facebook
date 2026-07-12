import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ImageValidationService } from "../../../../infrastructure/storage/image-validation.service";
import { StorageService } from "../../../../infrastructure/storage/storage.service";
import { MEDIA_REPOSITORY, MediaRepository } from "../../domain/repository-contracts/media.repository";
import { ImageUploadPolicy } from "../../domain/policies/image-upload.policy";
import { UploadMediaResult } from "../interfaces/upload-media-result.interface";
import { UploadableImageFile } from "../../../../infrastructure/storage/storage.service";

@Injectable()
export class UploadMediaService {
  constructor(
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepository: MediaRepository,
    private readonly storageService: StorageService,
    private readonly imageValidationService: ImageValidationService,
    private readonly imageUploadPolicy: ImageUploadPolicy,
    private readonly configService: ConfigService,
  ) {}

  async execute(ownerId: string, file: UploadableImageFile): Promise<UploadMediaResult> {
    const maxSizeBytes = Number(this.configService.get<string>("MAX_IMAGE_SIZE_BYTES") ?? 5 * 1024 * 1024);
    this.imageValidationService.validateMimeType(file.mimetype);
    this.imageUploadPolicy.canUpload(file.mimetype, file.size, maxSizeBytes);

    const uploaded = await this.storageService.uploadImage(file);

    const media = await this.mediaRepository.create({
      ownerId,
      imageUrl: uploaded.imageUrl,
      storageKey: uploaded.storageKey,
      mimeType: uploaded.mimeType,
      fileSize: BigInt(uploaded.fileSize),
      width: uploaded.width ?? null,
      height: uploaded.height ?? null,
    });

    return { media };
  }
}
