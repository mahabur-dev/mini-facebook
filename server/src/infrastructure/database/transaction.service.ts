import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  execute<T>(work: (transaction: PrismaService) => Promise<T>) {
    return this.prisma.$transaction(async (transaction) => work(transaction as PrismaService));
  }
}
