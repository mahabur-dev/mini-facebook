import { Module } from "@nestjs/common";
import { ImageValidationService } from "./image-validation.service";
import { MediaValidationService } from "./media-validation.service";
import { StorageService } from "./storage.service";

@Module({
  providers: [StorageService, ImageValidationService, MediaValidationService],
  exports: [StorageService, ImageValidationService, MediaValidationService],
})
export class StorageModule {}
