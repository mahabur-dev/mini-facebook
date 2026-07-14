import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../infrastructure/database/database.module";
import { SESSIONS_REPOSITORY } from "../authentication/domain/repository-contracts/sessions.repository";
import { SessionPolicy } from "../authentication/domain/policies/session.policy";
import { PrismaSessionsRepository } from "../authentication/infrastructure/repositories/prisma-sessions.repository";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SESSIONS_REPOSITORY,
      useClass: PrismaSessionsRepository,
    },
    SessionPolicy,
  ],
  exports: [SESSIONS_REPOSITORY, SessionPolicy],
})
export class SessionsModule {}
