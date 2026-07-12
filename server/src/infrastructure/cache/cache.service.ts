import { Injectable } from "@nestjs/common";

@Injectable()
export class CacheService {
  async get<T>(_key: string): Promise<T | null> {
    return null;
  }

  async set(_key: string, _value: unknown, _ttlSeconds?: number): Promise<void> {}

  async del(..._keys: string[]): Promise<void> {}
}
