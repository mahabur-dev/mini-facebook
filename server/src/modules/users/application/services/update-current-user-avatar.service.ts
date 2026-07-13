import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ImageValidationService } from "../../../../infrastructure/storage/image-validation.service";
import { StorageService, UploadableImageFile } from "../../../../infrastructure/storage/storage.service";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";

@Injectable()
export class UpdateCurrentUserAvatarService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly imageValidationService: ImageValidationService,
    private readonly configService: ConfigService,
  ) {}

  async execute(userId: string, file: UploadableImageFile) {
    this.imageValidationService.validateMimeType(file.mimetype);
    const maxSizeBytes = Number(this.configService.get<string>("MAX_IMAGE_SIZE_BYTES") ?? 5 * 1024 * 1024);

    if (file.size > maxSizeBytes) {
      throw new BadRequestException("Image is too large");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const uploaded = await this.storageService.uploadImage(file);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profileImageUrl: uploaded.imageUrl,
        profileImageStorageKey: uploaded.storageKey,
      },
    });

    if (user.profileImageStorageKey) {
      await this.storageService.deleteImage(user.profileImageStorageKey).catch(() => undefined);
    }

    const { passwordHash: _passwordHash, ...safeUser } = updatedUser;
    return safeUser;
  }
}
