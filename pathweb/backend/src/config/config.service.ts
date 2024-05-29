import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get(key: string): string {
    return this.nestConfigService.get<string>(key);
  }

  get jwtSecret(): string {
    return this.get('JWT_SECRET');
  }

  get dbHost(): string {
    return this.get('DB_HOST');
  }

  get dbPort(): number {
    return Number(this.get('DB_PORT'));
  }

  get dbUsername(): string {
    return this.get('DB_USERNAME');
  }

  get dbPassword(): string {
    return this.get('DB_PASSWORD');
  }

  get dbName(): string {
    return this.get('DB_NAME');
  }
}
