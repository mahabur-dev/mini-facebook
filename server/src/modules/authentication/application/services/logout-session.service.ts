import { Inject, Injectable } from "@nestjs/common";
import { createHash } from "crypto";
import { SESSIONS_REPOSITORY, SessionsRepository } from "../../domain/repository-contracts/sessions.repository";

@Injectable()
export class LogoutSessionService {
  constructor(@Inject(SESSIONS_REPOSITORY) private readonly sessionsRepository: SessionsRepository) {}

  async execute(refreshToken: string) {
    const tokenHash = createHash("sha256").update(refreshToken).digest("hex");
    const session = await this.sessionsRepository.findByRefreshTokenHash(tokenHash);
    if (session) {
      await this.sessionsRepository.revoke(session.id, new Date());
    }
    return { success: true };
  }
}
