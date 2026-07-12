import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { RegistrationPolicy } from "../../domain/policies/registration.policy";
import { USERS_REPOSITORY, UsersRepository } from "../../domain/repository-contracts/users.repository";
import { SESSIONS_REPOSITORY, SessionsRepository } from "../../domain/repository-contracts/sessions.repository";
import { toSafeUser } from "../../presentation/presenters/safe-user.presenter";
import { RegisterDto } from "../../presentation/dto/register.dto";
import { AuthSessionResult } from "../interfaces/auth-session-result.interface";

function hashRefreshToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

@Injectable()
export class RegisterUserService {
  constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepository,
    @Inject(SESSIONS_REPOSITORY) private readonly sessionsRepository: SessionsRepository,
    private readonly registrationPolicy: RegistrationPolicy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: RegisterDto, context: { ipAddress?: string | null; userAgent?: string | null } = {}): Promise<AuthSessionResult> {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.usersRepository.findByEmail(email);
    this.registrationPolicy.canRegister(existingUser);

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersRepository.create({
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      email,
      passwordHash,
    });

    const auth = await this.createSessionPair(user.id, user.email, context);
    return {
      user: toSafeUser(user),
      ...auth,
    };
  }

  private async createSessionPair(
    userId: string,
    email: string,
    context: { ipAddress?: string | null; userAgent?: string | null },
  ) {
    const accessSecret = this.configService.get<string>("JWT_ACCESS_SECRET") ?? "change-me-access-secret";
    const accessExpiresIn = this.configService.get<string>("JWT_ACCESS_EXPIRES_IN") ?? "15m";
    const refreshExpiresIn = this.configService.get<string>("JWT_REFRESH_EXPIRES_IN") ?? "7d";

    const refreshToken = randomBytes(48).toString("base64url");
    const refreshTokenHash = hashRefreshToken(refreshToken);
    const expiresAt = new Date(Date.now() + this.parseDuration(refreshExpiresIn));

    await this.sessionsRepository.create({
      userId,
      refreshTokenHash,
      expiresAt,
      ipAddress: context.ipAddress ?? null,
      userAgent: context.userAgent ?? null,
    });

    const accessToken = await this.jwtService.signAsync({ sub: userId, email }, { secret: accessSecret, expiresIn: accessExpiresIn });

    return { accessToken, refreshToken };
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
