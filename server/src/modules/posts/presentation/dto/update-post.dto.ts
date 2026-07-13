import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";

export class UpdatePostDto {
  @ApiPropertyOptional({ example: "Updated caption text", maxLength: 5000 })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @ApiPropertyOptional({ enum: PostVisibility, example: PostVisibility.PRIVATE })
  @IsOptional()
  @IsEnum(PostVisibility)
  visibility?: PostVisibility;
}
