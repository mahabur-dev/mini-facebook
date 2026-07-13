import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/database/prisma.service";
import { UpdateCurrentUserDto } from "../../presentation/dto/update-current-user.dto";

@Injectable()
export class UpdateCurrentUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, dto: UpdateCurrentUserDto) {
    const firstName = dto.firstName?.trim();
    const lastName = dto.lastName?.trim();

    if (!firstName && !lastName) {
      throw new BadRequestException("At least one profile field is required");
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
      },
    });

    const { passwordHash: _passwordHash, ...safeUser } = updatedUser;
    return safeUser;
  }
}
