import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export class RefreshDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  refreshToken?: string;
}
