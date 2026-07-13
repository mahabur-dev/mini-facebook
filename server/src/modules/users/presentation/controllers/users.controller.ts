import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { UploadableImageFile } from "../../../../infrastructure/storage/storage.service";
import { UpdateCurrentUserService } from "../../application/services/update-current-user.service";
import { UpdateCurrentUserAvatarService } from "../../application/services/update-current-user-avatar.service";
import { UpdateCurrentUserDto } from "../dto/update-current-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly updateCurrentUserService: UpdateCurrentUserService,
    private readonly updateCurrentUserAvatarService: UpdateCurrentUserAvatarService,
  ) {}

  @Patch("me")
  @ApiOperation({ summary: "Update the current user profile" })
  async updateMe(@CurrentUser() user: { sub: string }, @Body() dto: UpdateCurrentUserDto) {
    const updatedUser = await this.updateCurrentUserService.execute(user.sub, dto);
    return { user: updatedUser };
  }

  @Patch("me/avatar")
  @ApiOperation({ summary: "Update the current user profile photo" })
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
  @UseInterceptors(FileInterceptor("file"))
  async updateAvatar(
    @CurrentUser() user: { sub: string },
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: Number(process.env.MAX_IMAGE_SIZE_BYTES ?? 5 * 1024 * 1024) })],
      }),
    )
    file: UploadableImageFile,
  ) {
    const updatedUser = await this.updateCurrentUserAvatarService.execute(user.sub, file);
    return { user: updatedUser };
  }
}
