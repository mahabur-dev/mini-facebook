import { Transform } from "class-transformer";
import { IsOptional, IsString, Max, Min } from "class-validator";

export class ListLikersQueryDto {
  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
