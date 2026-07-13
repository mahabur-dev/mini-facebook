import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "Amin", description: "User first name" })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: "Rahman", description: "User last name" })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: "amin@example.com", description: "Login email address" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Password123!", minLength: 8, description: "Account password" })
  @IsString()
  @MinLength(8)
  password!: string;
}
