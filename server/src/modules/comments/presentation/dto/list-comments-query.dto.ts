import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Max, Min } from "class-validator";

export class ListCommentsQueryDto {
  @ApiPropertyOptional({ example: "eyJjcmVhdGVkQXQiOiIyMDI2LTA3LTEyVDA5OjAwOjAwLjAwMFoiLCJpZCI6ImNvbW1lbnRfMTAifQ", description: "Opaque cursor token" })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 30, default: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(30)
  limit?: number = 10;
}
