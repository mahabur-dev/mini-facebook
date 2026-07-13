import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, Max, Min } from "class-validator";

export class GetFeedDto {
  @ApiPropertyOptional({ example: "eyJjcmVhdGVkQXQiOiIyMDI2LTA3LTEyVDEwOjAwOjAwLjAwMFoiLCJpZCI6InBvc3RfMTAifQ", description: "Opaque cursor token" })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 20, default: 10 })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(20)
  limit?: number = 10;
}
