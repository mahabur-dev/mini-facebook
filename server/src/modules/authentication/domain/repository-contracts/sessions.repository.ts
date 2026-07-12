import { UserSessionEntity } from "../entities/user-session.entity";

export interface CreateSessionInput {
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface SessionsRepository {
  create(input: CreateSessionInput): Promise<UserSessionEntity>;
  findByRefreshTokenHash(refreshTokenHash: string): Promise<UserSessionEntity | null>;
  revoke(id: string, revokedAt: Date): Promise<void>;
  rotateRefreshToken(id: string, refreshTokenHash: string, expiresAt: Date): Promise<void>;
  revokeUserSessions(userId: string, revokedAt: Date): Promise<void>;
}

export const SESSIONS_REPOSITORY = Symbol("SESSIONS_REPOSITORY");
