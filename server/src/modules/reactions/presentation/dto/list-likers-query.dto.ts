import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Max, Min } from "class-validator";

export class ListLikersQueryDto {
  @ApiPropertyOptional({ example: "eyJjcmVhdGVkQXQiOiIyMDI2LTA3LTEyVDEwOjAwOjAwLjAwMFoiLCJpZCI6Imxpa2VfMTAifQ", description: "Opaque cursor token" })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 50, default: 20 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
