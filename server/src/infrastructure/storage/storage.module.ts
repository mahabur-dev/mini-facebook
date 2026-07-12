import { Module } from "@nestjs/common";
import { ImageValidationService } from "./image-validation.service";
import { StorageService } from "./storage.service";

@Module({
  providers: [StorageService, ImageValidationService],
  exports: [StorageService, ImageValidationService],
})
export class StorageModule {}
