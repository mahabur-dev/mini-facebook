import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { CreateSessionInput, SessionsRepository } from "../../domain/repository-contracts/sessions.repository";
import { UserSessionEntity } from "../../domain/entities/user-session.entity";

@Injectable()
export class PrismaSessionsRepository implements SessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateSessionInput): Promise<UserSessionEntity> {
    return this.prisma.userSession.create({
      data: {
        userId: input.userId,
        refreshTokenHash: input.refreshTokenHash,
        expiresAt: input.expiresAt,
        ipAddress: input.ipAddress ?? null,
        userAgent: input.userAgent ?? null,
      },
    });
  }

  async findByRefreshTokenHash(refreshTokenHash: string): Promise<UserSessionEntity | null> {
    return this.prisma.userSession.findUnique({
      where: { refreshTokenHash },
    });
  }

  async revoke(id: string, revokedAt: Date): Promise<void> {
    await this.prisma.userSession.update({
      where: { id },
      data: { revokedAt },
    });
  }

  async rotateRefreshToken(id: string, refreshTokenHash: string, expiresAt: Date): Promise<void> {
    await this.prisma.userSession.update({
      where: { id },
      data: {
        refreshTokenHash,
        expiresAt,
        revokedAt: null,
      },
    });
  }

  async revokeUserSessions(userId: string, revokedAt: Date): Promise<void> {
    await this.prisma.userSession.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt },
    });
  }
}
