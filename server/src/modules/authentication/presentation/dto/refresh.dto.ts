import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class RefreshDto {
  @ApiPropertyOptional({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "Refresh token fallback when cookie is unavailable",
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refreshToken?: string;
}
