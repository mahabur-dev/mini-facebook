import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { createHash, randomBytes } from "crypto";
import { SessionPolicy } from "../../domain/policies/session.policy";
import { USERS_REPOSITORY, UsersRepository } from "../../domain/repository-contracts/users.repository";
import { SESSIONS_REPOSITORY, SessionsRepository } from "../../domain/repository-contracts/sessions.repository";
import { AuthSessionResult } from "../interfaces/auth-session-result.interface";
import { toSafeUser } from "../../presentation/presenters/safe-user.presenter";

function hashRefreshToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

@Injectable()
export class RefreshSessionService {
  constructor(
    @Inject(SESSIONS_REPOSITORY) private readonly sessionsRepository: SessionsRepository,
    @Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepository,
    private readonly sessionPolicy: SessionPolicy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(refreshToken: string): Promise<AuthSessionResult> {
    const refreshTokenHash = hashRefreshToken(refreshToken);
    const session = await this.sessionsRepository.findByRefreshTokenHash(refreshTokenHash);
    this.sessionPolicy.canRefresh(session, refreshTokenHash);

    if (!session) {
      throw new Error("Unexpected session state");
    }

    const user = await this.usersRepository.findById(session.userId);
    if (!user) {
      throw new Error("Unexpected user state");
    }

    const nextRefreshToken = randomBytes(48).toString("base64url");
    const nextRefreshTokenHash = hashRefreshToken(nextRefreshToken);
    const refreshExpiresIn = this.configService.get<string>("JWT_REFRESH_EXPIRES_IN") ?? "7d";
    const nextExpiresAt = new Date(Date.now() + this.parseDuration(refreshExpiresIn));

    await this.sessionsRepository.rotateRefreshToken(session.id, nextRefreshTokenHash, nextExpiresAt);

    const accessSecret = this.configService.get<string>("JWT_ACCESS_SECRET") ?? "change-me-access-secret";
    const accessExpiresIn = this.configService.get<string>("JWT_ACCESS_EXPIRES_IN") ?? "15m";
    const accessToken = await this.jwtService.signAsync({ sub: user.id, email: user.email }, { secret: accessSecret, expiresIn: accessExpiresIn });

    return { user: toSafeUser(user), accessToken, refreshToken: nextRefreshToken };
  }

  private parseDuration(value: string) {
    const match = /^(\d+)([smhd])$/i.exec(value.trim());
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000;
    }

    const amount = Number(match[1]);
    const unit = match[2].toLowerCase();
    const unitMs = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    }[unit];

    return amount * (unitMs ?? 7 * 24 * 60 * 60 * 1000);
  }
}
