import { Transform } from "class-transformer";
import { IsOptional, IsString, Max, Min } from "class-validator";

export class ListCommentsQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(30)
  limit?: number = 10;
}
