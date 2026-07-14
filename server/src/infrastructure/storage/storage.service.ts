import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export type UploadableImageFile = {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname?: string;
};

export type UploadableFile = UploadableImageFile;

export type UploadedFileAsset = {
  fileUrl: string;
  imageUrl: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
};

export type UploadedImage = UploadedFileAsset;

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>("CLOUDINARY_CLOUD_NAME"),
      api_key: this.configService.get<string>("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get<string>("CLOUDINARY_API_SECRET"),
      secure: true,
    });
  }

  async uploadFile(file: UploadableFile): Promise<UploadedFileAsset> {
    const folder = this.configService.get<string>("CLOUDINARY_FOLDER") ?? "mini-facebook";
    const resourceType = this.getResourceType(file.mimetype);

    return new Promise<UploadedFileAsset>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          use_filename: Boolean(file.originalname),
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }

          resolve({
            fileUrl: result.secure_url,
            imageUrl: result.secure_url,
            storageKey: result.public_id,
            mimeType: file.mimetype,
            fileSize: file.size,
            width: result.width,
            height: result.height,
          });
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async uploadImage(file: UploadableImageFile): Promise<UploadedImage> {
    return this.uploadFile(file);
  }

  async deleteFile(storageKey: string): Promise<void> {
    await Promise.allSettled([
      cloudinary.uploader.destroy(storageKey, { resource_type: "image" }),
      cloudinary.uploader.destroy(storageKey, { resource_type: "video" }),
      cloudinary.uploader.destroy(storageKey, { resource_type: "raw" }),
    ]);
  }

  async deleteImage(storageKey: string): Promise<void> {
    await this.deleteFile(storageKey);
  }

  private getResourceType(mimeType: string): "image" | "video" | "raw" {
    if (mimeType.startsWith("image/")) {
      return "image";
    }

    if (mimeType.startsWith("video/")) {
      return "video";
    }

    return "raw";
  }
}
