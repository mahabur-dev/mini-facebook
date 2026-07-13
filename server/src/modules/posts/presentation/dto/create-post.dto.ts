import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";

export class CreatePostDto {
  @ApiPropertyOptional({ example: "A fresh update from today", maxLength: 5000 })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @ApiProperty({ enum: PostVisibility, example: PostVisibility.PUBLIC })
  @IsEnum(PostVisibility)
  visibility!: PostVisibility;

  @ApiPropertyOptional({ example: "media_123abc" })
  @IsOptional()
  @IsString()
  mediaId?: string;
}
