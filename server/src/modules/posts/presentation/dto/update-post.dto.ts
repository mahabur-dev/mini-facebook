import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { PostVisibility } from "../../domain/enums/post-visibility.enum";

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsEnum(PostVisibility)
  visibility?: PostVisibility;
}
