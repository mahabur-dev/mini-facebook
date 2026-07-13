import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { UploadMediaService } from "../../application/services/upload-media.service";
import { presentMedia } from "../presenters/media.presenter";
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from "@nestjs/common";
import { UploadableImageFile } from "../../../../infrastructure/storage/storage.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("media")
@ApiTags("Media")
export class MediaController {
  constructor(private readonly uploadMediaService: UploadMediaService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
      required: ["file"],
    },
  })
  @ApiOperation({ summary: "Upload an image for later attachment" })
  @Post("images")
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @CurrentUser() user: { sub: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Number(process.env.MAX_IMAGE_SIZE_BYTES ?? 5 * 1024 * 1024) }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/i }),
        ],
      }),
    )
    file: UploadableImageFile,
  ) {
    const result = await this.uploadMediaService.execute(user.sub, file);
    return { media: presentMedia(result.media) };
  }
}
