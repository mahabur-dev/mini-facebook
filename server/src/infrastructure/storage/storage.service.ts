import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export type UploadableImageFile = {
  buffer: Buffer;
  mimetype: string;
  size: number;
};

export type UploadedImage = {
  imageUrl: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
};

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

  async uploadImage(file: UploadableImageFile): Promise<UploadedImage> {
    const folder = this.configService.get<string>("CLOUDINARY_FOLDER") ?? "mini-facebook";

    return new Promise<UploadedImage>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
            return;
          }

          resolve({
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

  async deleteImage(storageKey: string): Promise<void> {
    await cloudinary.uploader.destroy(storageKey, { resource_type: "image" });
  }
}
