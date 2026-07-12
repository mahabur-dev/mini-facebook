import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { CreateUserInput, UsersRepository } from "../../domain/repository-contracts/users.repository";
import { UserEntity } from "../../domain/entities/user.entity";

function mapUser(user: any): UserEntity | null {
  return user
    ? ({
        ...user,
        status: user.status as UserStatus,
      } as UserEntity)
    : null;
}

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return mapUser(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return mapUser(user);
  }

  async create(input: CreateUserInput): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        passwordHash: input.passwordHash,
        status: UserStatus.ACTIVE,
      },
    });
    return mapUser(user)!;
  }

  async updateLastLoginAt(id: string, lastLoginAt: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { lastLoginAt },
    });
  }
}
