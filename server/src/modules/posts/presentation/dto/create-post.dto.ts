import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsEnum(PostVisibility)
  visibility!: PostVisibility;

  @IsOptional()
  @IsString()
  mediaId?: string;
}
