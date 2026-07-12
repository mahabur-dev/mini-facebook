import { Injectable } from "@nestjs/common";
import { SessionNotValidException } from "../exceptions/session-not-valid.exception";
import { UserSessionEntity } from "../entities/user-session.entity";

@Injectable()
export class SessionPolicy {
  canRefresh(session: UserSessionEntity | null, refreshTokenHash: string) {
    if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) {
      throw new SessionNotValidException();
    }

    if (session.refreshTokenHash !== refreshTokenHash) {
      throw new SessionNotValidException();
    }
  }
}
