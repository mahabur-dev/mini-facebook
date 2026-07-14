import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MediaValidationService } from "../../../../infrastructure/storage/media-validation.service";
import { StorageService, UploadableFile } from "../../../../infrastructure/storage/storage.service";
import { MEDIA_REPOSITORY, MediaRepository } from "../../domain/repository-contracts/media.repository";
import { MediaUploadPolicy } from "../../domain/policies/media-upload.policy";
import { UploadMediaResult } from "../interfaces/upload-media-result.interface";

@Injectable()
export class UploadMediaService {
  constructor(
    @Inject(MEDIA_REPOSITORY) private readonly mediaRepository: MediaRepository,
    private readonly storageService: StorageService,
    private readonly mediaValidationService: MediaValidationService,
    private readonly mediaUploadPolicy: MediaUploadPolicy,
    private readonly configService: ConfigService,
  ) {}

  async execute(ownerId: string, file: UploadableFile): Promise<UploadMediaResult> {
    const maxSizeBytes = Number(this.configService.get<string>("MAX_IMAGE_SIZE_BYTES") ?? 5 * 1024 * 1024);
    this.mediaValidationService.validateMimeType(file.mimetype);
    this.mediaUploadPolicy.canUpload(file.mimetype, file.size, maxSizeBytes);

    const uploaded = await this.storageService.uploadFile(file);

    const media = await this.mediaRepository.create({
      ownerId,
      fileUrl: uploaded.fileUrl,
      storageKey: uploaded.storageKey,
      mimeType: uploaded.mimeType,
      fileSize: BigInt(uploaded.fileSize),
      width: uploaded.width ?? null,
      height: uploaded.height ?? null,
    });

    return { media };
  }
}
