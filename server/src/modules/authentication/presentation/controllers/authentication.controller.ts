import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Response, Request } from "express";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../../../common/decorators/current-user.decorator";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { RefreshDto } from "../dto/refresh.dto";
import { RegisterUserService } from "../../application/services/register-user.service";
import { LoginUserService } from "../../application/services/login-user.service";
import { RefreshSessionService } from "../../application/services/refresh-session.service";
import { LogoutSessionService } from "../../application/services/logout-session.service";
import { GetCurrentUserService } from "../../application/services/get-current-user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
export class AuthenticationController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly loginUserService: LoginUserService,
    private readonly refreshSessionService: RefreshSessionService,
    private readonly logoutSessionService: LogoutSessionService,
    private readonly getCurrentUserService: GetCurrentUserService,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new account" })
  async register(@Body() dto: RegisterDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const result = await this.registerUserService.execute(dto, {
      ipAddress: request.ip ?? null,
      userAgent: request.headers["user-agent"] ?? null,
    });

    this.attachRefreshCookie(response, result.refreshToken);
    return result;
  }

  @Post("login")
  @ApiOperation({ summary: "Log in with email and password" })
  async login(@Body() dto: LoginDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const result = await this.loginUserService.execute(dto, {
      ipAddress: request.ip ?? null,
      userAgent: request.headers["user-agent"] ?? null,
    });

    this.attachRefreshCookie(response, result.refreshToken);
    return result;
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh the current session" })
  async refresh(@Body() dto: RefreshDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const result = await this.refreshSessionService.execute(this.getRefreshToken(dto, request));
    this.attachRefreshCookie(response, result.refreshToken);
    return result;
  }

  @Delete("logout")
  @ApiOperation({ summary: "Log out and invalidate the refresh session" })
  async logout(@Body() dto: RefreshDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
    await this.logoutSessionService.execute(this.getRefreshToken(dto, request));
    response.clearCookie("refresh_token", { path: "/api/v1/auth" });
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("me")
  @ApiOperation({ summary: "Get the current user profile" })
  async me(@CurrentUser() user: { sub: string }) {
    return this.getCurrentUserService.execute(user.sub);
  }

  private attachRefreshCookie(response: Response, refreshToken: string) {
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/api/v1/auth",
    });
  }

  private getRefreshToken(dto: RefreshDto, request: Request) {
    const cookieRefreshToken = request.cookies?.refresh_token as string | undefined;
    const bodyRefreshToken = dto.refreshToken?.trim();
    const refreshToken = bodyRefreshToken || cookieRefreshToken;

    if (!refreshToken) {
      throw new BadRequestException("Refresh token is required");
    }

    return refreshToken;
  }
}
