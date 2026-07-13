import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ example: "Nice post!", maxLength: 2000 })
  @IsString()
  @MaxLength(2000)
  content!: string;

  @ApiPropertyOptional({ example: "comment_123abc", description: "Parent comment for replies" })
  @IsOptional()
  @IsString()
  parentCommentId?: string;
}
